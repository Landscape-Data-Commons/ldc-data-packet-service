import fs from 'fs'
import JSZip from "jszip"
import path from 'path'
import csv from 'csv-parser'
import papa from 'papaparse'

import env from '../meta-gen-alt/metadata-generator/env'

import {
  // extractQueryParameters,
  extractPostParameters,
  retrieveAndPrintAllTableData} from '../request-handler/get-routes'
import getColumnDescriptions from '../meta-gen-alt/database/queries-metadata'

import generateMetadataXmlFile from '../meta-gen-alt/metadata-generator/generate/metadata-generator'



async function getCsvDataTableHeaders(csvFile: string | undefined) {
  if(csvFile===undefined){
    console.log("no csv file / undefined")
  }else {
    let parseStream = papa.parse(csvFile, {header: true})
    // console.log(parseStream)
    return parseStream.meta.fields
  }
}

// async function getCsvDataFileHeaders(tableArray:[]) {
//   // 2022-09-27-CMF: Removed due to JavaScript/Node/TypeScript incompatibility
//   // const dataDir = env.CSV_DATA_FILES_DIR
  
//   const csvDataFileHeaders = {}
//   for (let tablename of tableArray) {
//     // @ts-ignore
//     csvDataFileHeaders[tablename] = await getCsvDataTableHeaders(csvData)
//   }
//   return csvDataFileHeaders
// }


async function extractColumnDescriptions(csvBlob, tablename) {
  if(csvBlob!==null){
    let csvHeaderNames = await getCsvDataTableHeaders(csvBlob)
    let queryResults = await getColumnDescriptions(tablename)

    for(let queryResult of queryResults){

      const indexOfColumnName = csvHeaderNames.indexOf(queryResult.column_name)
      if (indexOfColumnName >= 0) {  // to skip rid
        const columnDescription = (queryResult.column_description === null) ? '' : queryResult.column_description

        csvHeaderNames[indexOfColumnName] = 
          csvHeaderNames[indexOfColumnName] + env.DELIMITER + columnDescription.replace(/^"(.*)"$/, '$1')
      }
    }
    return csvHeaderNames
  } else {
    return null
  }
}



export const newpackager = async (request) =>{
    // new zip per request
    let zip: JSZip = new JSZip()
    
    const directoryPath = `./temp`
    const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}.zip`
    const dest = `${directoryPath}/${uniqueName}`
    let filesize
    
    ////////////////////////////////////////
    // parsing request with mini-api handler
  
    let fullTables = await retrieveAndPrintAllTableData(extractPostParameters(request), request)
    console.log(fullTables, "FULL TABLES")
    // adding all the promises inside the object into Promise.all
    let allPromises = Promise.all(Object.values(fullTables))
    const csvDataFileHeaders = {}
    console.log(allPromises, " ALL PROMISES")
    // iterating over each promise, turning resulting jsons into csv's
    for(let table of Object.keys(fullTables)){
      console.log(`printing ${table}!!`)
      fullTables[table].then(async data=>{
        // let csv = creatingCSV(data, table)
        /* PER TABLE:
        1. csvblob from json promise --> deposit in zip
        2. tableDescriptions from csvBlob
        3. xml from tableDescription --> deposit in zip
        */
        let csv = await creatingCSV(data,table)
        if(csv!==null){
          zip.file(`${table}.csv`,csv)
        }
        
        let tableDescriptions = await extractColumnDescriptions(csv, table)

        console.log(await generateMetadataXmlFile(tableDescriptions,table))
        
        
        // if (xmlFile!==null && xmlFile!==undefined){
        //       console.log("aqui esta")
        //       zip.file(`${table}_metadata.xml`, xmlFile)
        // }
        
        
        // console.log(xml)
        //  IMPLEMENTING XML 
        
        

        
        

        //  GET HEADER NAMES WITH CSV
        // csv.then(stream =>{
        //   if (stream!==undefined){
        //     // console.log(stream)
        //     csvDataFileHeaders[table] = getCsvDataTableHeaders(stream)
        //   }
        // })
        
        // let csvHeaderNames = csvDataFileHeaders[table]
        // queryResults
        //   .then(queryResult =>{
        //     // console.log(queryResult, "QUERY RESULT")
        //     // console.log(csvDataFileHeaders[table], "TABLEROWs")
        //     if(Object.keys(csvDataFileHeaders).includes(table)){
        //       let indexOfColumnName = csvDataFileHeaders[table].indexOf(queryResult.column_name)
        //       if (indexOfColumnName >= 0) {
        //         const columnDescription = (queryResult.column_description === null) ? '' : queryResult.column_description
        //         // 2022-09-24-CMF: Initial/final double quotes removed (https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string) 
        //         csvHeaderNames[indexOfColumnName] = csvHeaderNames[indexOfColumnName] + env.DELIMITER + columnDescription.replace(/^"(.*)"$/, '$1')
        //       }
        //     }
            // console.log(csvHeaderNames)
          // })
        
    // adding created CSV into zip file (takes a while)
        // zip.file(`${table}.csv`,csv)
      })
    }
    // after per table iteration
    // console.log(csvDataFileHeaders)
    // after all requested table promises are resolved, write zip file
    allPromises.then(finished=>{

      // console.log(csvDataFileHeaders)
      // console.log(extractColumnDescriptions(csvDataFileHeaders))
      
      // console.log(csvDataFileHeaders)
      // console.log("ok")
      zip.generateAsync({type:'nodebuffer'}, )
      .then(buff=>{
        
        fs.writeFile(dest,buff,(err)=>{
          if(err) throw err;
          fs.stat(dest, (err, stats) => {
            if (err) {
                console.log(`File doesn't exist.`);
            } 
          })
      })
    // // incorporate request data into Mongo model
    //             // filesize = stats.size
    //             // if(filesize){
    //             //   const file = new Files({
    //             //     user_email: "null",
    //             //     filename: uniqueName,
    //             //     uuid: uuidv4(),
    //             //     path: dest,
    //             //     size: filesize
    //             //   })
    //             //   let response = file.save()
    //               // console.log(response)
    // // ADD MONGODB ENTRY after writing file to local filesystem
    // // SEND MAIL
    //               let dl_link =process.env.APP_BASE_URL
    //               let uuid = uuidv4()
    // //               // buff.then((success)=>{
    //               let filelink = `${dl_link}/api/files/${uuid}`
    //                 // const msg = {
    //                 //   from: `LDC data provider <bonefont.work@gmail.com>`,
    //                 //   to: user_profile.email,
    //                 //   subject: 'LDC datapacket download is ready',
    //                 //   text: `Download link will expire in 24 hours!`,
    //                 //   html: `<strong>download <a href=${filelink}>link</a></strong>`
    //                 // }
    //                 // sgMail
    //                 // .send(msg)
    //                 // .then(() => {
    //                 //   console.log('Email sent')
    //                 // })
    //                 // .catch((error) => {
    //                 //   console.error(error)
    //                 // })
    // //  SEND LINK BACK to client
    //                 // response.json({ file: filelink })
    //                 // console.log("este es response: ", response)
    //                 // console.log("este es success: ", success)
    //                 console.log(filelink)
                    
                //   // })
                // } else {
                //   console.log("filesize has not arrived")
                // }
              // }
          // });
        // })  
    //   })
    
    // // catch for the zip.generateasync promise
    //   .catch(err=>console.log(err))
    })
    // catch for the Promise.all 
    .catch(err=>console.log(err))
  })
}
  
  // function that creates csv from a JSON/response object from Postgres
const creatingCSV = async (myObj, tablename) => {
    // csv
    console.log(tablename)
    console.log("LLEGUE A CREATING CSV")

    const items = myObj
    // console.log(items)
    if(items.length!==0){
      const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
   
      const header = Object.keys(items[0])
      
      const csv_file = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      ].join('\r\n')
      
      return csv_file
    } else {
      console.log(`'${tablename}' is empty in pg`)
      return null
    }
    
  }



