import {Request, Response} from 'express'
import axios from 'axios'
import JSZip from 'jszip'
import * as Mongoose from "mongoose";
import saveAs from 'file-saver';


////
// on request to this api: 
// pull data from main api 
// package it into zip file 
// store zip file in mongo with a temp hash as key + time to live of 1 day
// create an endpoint that will use the hash to pull the mongodb data: www.ldc.org/file/543gerdgd4 and download will commence
export const getData = (req:Request, res:Response)=>{
  // res.sendStatus(200)
  axios.get('https://api.landscapedatacommons.org/api/geoIndicators?limit=2') // test
  .then(data=>{
    let csvpack = creatingCSV(data.data)
    let zippack = zipCSV(csvpack,"TEST")
    res.send(data.data)
  })
  


}

const creatingCSV = (myObj) =>{
  // csvPAck
  const items = myObj
  const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
  const header = Object.keys(items[0])
  const csv = [
    header.join(','), // header row first
    ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n')
  // let blob:Blob = new Blob([csv], {type: 'text/csv' })
  let buffer = Buffer.from(csv);
  let arraybuffer = Uint8Array.from(buffer).buffer;
  return arraybuffer
}

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

