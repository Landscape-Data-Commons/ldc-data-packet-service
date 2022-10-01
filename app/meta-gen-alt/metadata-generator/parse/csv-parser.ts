import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import papa from 'papaparse'

// // 2022-09-23-CMF: For testing 
//console.log(path.dirname(require.main.filename))

const CSV_DATA_FILES_DIR = path.resolve(__dirname, '../csv-data-files') 
 

// 2022-09-23-CMF: Get headers using promisified csv-parser file stream
function getCsvDataTableHeaders(csvFile: string | undefined) {
  if(csvFile===undefined){
    console.log("no csv file / undefined")
  }else {
    let parseStream = papa.parse(csvFile, {header: true})
    // console.log(parseStream)
    return parseStream.meta.fields
  }
}

async function getCsvDataFileHeaders() {
  // 2022-09-27-CMF: Removed due to JavaScript/Node/TypeScript incompatibility
  // const dataDir = env.CSV_DATA_FILES_DIR
  const dataDir = CSV_DATA_FILES_DIR
  const csvDataFileHeaders = {}
  for (let filename of fs.readdirSync(dataDir).filter((f) => /\.csv$/.test(f))) {
    // @ts-ignore
    csvDataFileHeaders[filename.split('.')[0]] = await getCsvDataTableHeaders(dataDir, filename)
  }
  return csvDataFileHeaders
}

function test(){
/*
1. for each table, make a request to the db using miniapi functions get a json
  a. retrieveAndPrintAllTableData(extractPostParameters(request),request)
  b. returns promise (with json data when it resolves.)

2. turn the json into csv for packaging
  a. creatingCSV(jsondata/object, tablename)
  b. returns 
3. remove headers from csv ( modified CMF code - getCsvDataTableHeaders)
4. using headers, pull in descriptions from tblSchema (modified CMF code)
5. create xml nodes with header/description combo (modified CMF code - extract column descriptions)
6. deposit complete blobs of xml and csv data into zip file

*/
}
export default {getCsvDataFileHeaders, getCsvDataTableHeaders}