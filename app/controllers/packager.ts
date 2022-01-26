
import axios from "axios"
import fs from 'fs'
import JSZip from "jszip"
import Files from "../models/files"
const { v4: uuidv4 } = require('uuid')

import { Client } from "@sendgrid/client";
import sgMail from "@sendgrid/mail";


sgMail.setClient(new Client());
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// storing results in zip, storing zip in local fs
export const packager = async (table_array, user_profile) =>{
  // new zip per request
  let zip: JSZip = new JSZip()
  
  const directoryPath = `/usr/src/app/temp`
  const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}.zip`
  const dest = `${directoryPath}/${uniqueName}`
  let filesize

  // adding each table in the array to zip
  for(let table of table_array){

    let single_table = await single_request(table)
    zip.file(`${table}.csv`, single_table)
  }
  // creating buffer with generated zip
  const buffer = await (zip.generateAsync({type:'nodebuffer'}, ))
  // writing zip buffer to local filesystem 
  fs.writeFile(dest,buffer,(err)=>{
    if(err) throw err;
    fs.stat(dest, (err, stats) => {
      if (err) {
          console.log(`File doesn't exist.`);
      } else {
          filesize = stats.size
          if(filesize){
            const file = new Files({
              user_email: user_profile.email,
              filename: uniqueName,
              uuid: uuidv4(),
              path: dest,
              size: filesize
            })
            let response = file.save()
            console.log(response)
            
            response.then((success)=>{
              let filelink = `${process.env.APP_BASE_URL}/api/files/${success.uuid}`
              const msg = {
                from: `LDC data provider <bonefont.work@gmail.com>`,
                to: user_profile.email,
                subject: 'LDC datapacket download is ready',
                text: `Download link will expire in 24 hours!`,
                html: `<strong>download <a href=${filelink}>link</a></strong>`
              }
              sgMail
              .send(msg)
              .then(() => {
                console.log('Email sent')
              })
              .catch((error) => {
                console.error(error)
              })
              // res.json({ file: filelink })
            })
          } else {
            console.log("filesize has not arrived")
          }
        }
    });
  })
}

const single_request=(table:string):Promise<string>=> 
  axios.get(`https://api.landscapedatacommons.org/api/${table}?limit=2`)
  .then(data =>{
    let csv_file:string = creatingCSV(data.data)
    return csv_file
  })
  


const creatingCSV = (myObj) => {
    // csvPAck
    const items = myObj
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    const csv_file = [
      header.join(','), // header row first
      ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
   
    return csv_file
  }
  