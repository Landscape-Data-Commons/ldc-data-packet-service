import fs from 'fs'
import JSZip from "jszip"
import path from 'path'
import csv from 'csv-parser'
import papa from 'papaparse'

import env from '../meta-gen-alt/metadata-generator/env'

import {
  extractPostParameters,
  retrieveAndPrintAllTableData} from '../request-handler/get-routes'
import getColumnDescriptions from '../meta-gen-alt/database/queries-metadata'

import generateMetadataXmlFile from '../meta-gen-alt/metadata-generator/generate/metadata-generator'



async function getCsvDataTableHeaders(csvFile: string | undefined) {
  if(csvFile===undefined){
    console.log("no csv file / undefined")
  }else {
    let parseStream = papa.parse(csvFile, {header: true})
    return parseStream.meta.fields
  }
}

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
    let initialPull= Promise.all(Object.values(fullTables))

    // utility objects in promise-chain
    let descriptionObj= {}
    let xmlObject = {}
    
    let allPromises = Promise.all([initialPull, fullTables])

    initialPull.then(x=>{
      for(let table of Object.keys(fullTables)){
        console.log(`printing ${table}!!`)
        fullTables[table].then(async data=>{
          let csv = await creatingCSV(data, table)
          if(csv!==null){
            zip.file(`${table}.csv`,csv)
          }
          let desc = await extractColumnDescriptions(csv,table)
          descriptionObj[table] = desc 
        })
        /*
          AFTER CSV added to zip 
          AFTER col descriptions parsed
          DO generate xml
        */
        .then(async not_used=>{
          if(descriptionObj[table]!==null){
            xmlObject[table] = await generateMetadataXmlFile(descriptionObj[table], table)
          }
        })
        /*
          AFTER generate xml
          DO add xml to zip
        */
        .then(async not_used=>{
          console.log("zipeando xmls")
          zip.file(path.join("metadata",`${table}_metadata.xml`), xmlObject[table])
        })
      }
    })
    /*
     AFTER CSV generated and zipped 
     AFTER XML generated and zipped
     DO GENERATE ZIP LOCALLY
    */
    
    allPromises.then(finished=>{
  
          setTimeout(()=>{
            console.log("ultimo timer")
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
                  })

          },10000)
      console.log("done")
    })

}
  
  // function that creates csv from a JSON/response object from Postgres
const creatingCSV = async (myObj, tablename) => {

    const items = myObj
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



