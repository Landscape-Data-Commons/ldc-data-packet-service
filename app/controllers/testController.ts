import {Request, Response} from 'express'
import axios from 'axios'
import JSZip from 'jszip'

import multer from 'multer'
import path from 'path'
import Files from "../models/files"
const { v4: uuidv4 } = require('uuid')
import saveAs from 'file-saver';
import fs from 'fs'

////
// on request to this api: 
// pull data from main api 
// package it into zip file 


// storing inside container local diskstorage 
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '/usr/src/app/temp'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  }
})

let upload = multer({storage, limits: {fileSize: 1000000 * 100 }, }).single('myfile')

// find mongo referenced file in local filesystem
export const showData = async (req, res) => {
  try {
      const file = await Files.findOne({ uuid: req.params.uuid });
      if(!file) {
          return res.render('download', { error: 'Link has expired.'});
      } 
      return res.render('download', { uuid: file.uuid, fileName: file.filename, fileSize: file.size, downloadLink: `${process.env.APP_BASE_URL}/api/files/download/${file.uuid}` });
  } catch(err) {
      return res.render('download', { error: 'Something went wrong.'});
  }
};

// send file (and create entry on mongo) thru post query
export const createData = async (req:Request, res:Response) =>{
  upload(req, res, async(err)=>{
    if(err){
      return res.status(500).send({ error: err.message })
    }
    const file = new Files({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size
    })
    const response = await file.save()
    res.json({ file: `${process.env.APP_BASE_URL}/api/files/${response.uuid}` })
  })
}


export const getData = async (req:Request, res:Response)=>{
  const file = await Files.findOne({uuid: req.params.uuid})
  if (!file){
    return res.status(200).send("no existe")
  }
  const response = await file.save();
  const filePath = `${__dirname}/../${file.path}`;
  res.download(filePath)
}
  

  

const creatingCSV = (myObj) =>{
  // csvPAck
  const items = myObj
  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(items[0])
  const csv_file = [
    header.join(','), // header row first
    ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n')
  const directoryPath = `${process.cwd()}/app/temp`
  const directoryContents = fs.readdirSync(directoryPath, {
    withFileTypes: true,
  });

  fs.writeFile(`${directoryPath}/test_${directoryContents.length}.csv`,csv_file,(err)=>{
    if(err) throw err;
    console.log(csv_file)
  })
}


const addFilesFromDirectoryToZip = (directoryPath = "", zip) => {
  const directoryContents = fs.readdirSync(directoryPath, {
    withFileTypes: true,
  });
 
  directoryContents.forEach(({ name }) => {
    const path = `${directoryPath}/${name}`;

    if (fs.statSync(path).isFile()) {
      zip.file(path, fs.readFileSync(path, "utf-8"));
    }

    if (fs.statSync(path).isDirectory()) {
      addFilesFromDirectoryToZip(path, zip);
    }
  });
};


const zipCSV = (blob, zipname:string) =>{
  //  create zip from csv
  let zip: JSZip = new JSZip();
    let now = new Date()
    let iso = now.toISOString()
    let zipName = zipname+`_${iso}`+'.zip'
    // for(let [blobName,csvBlob] of Object.entries(blob)){
    //   if(csvBlob!==null){
        
    zip.file("blob.csv", blob)
    //   }
    // }

    zip.generateAsync({type:'arraybuffer'}).then((content)=>{
      if(content){
        // can only be served on a front end component, will look for node alternative
        // store it in mongo
        saveAs(content.toString(),zipName)
      }
    })
}

