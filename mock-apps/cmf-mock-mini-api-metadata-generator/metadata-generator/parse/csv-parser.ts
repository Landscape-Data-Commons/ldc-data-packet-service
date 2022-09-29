import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'

// // 2022-09-23-CMF: For testing 
//console.log(path.dirname(require.main.filename))

const CSV_DATA_FILES_DIR = path.resolve(__dirname, '../csv-data-files') 
 

// 2022-09-23-CMF: Get headers using promisified csv-parser file stream
function getCsvDataTableHeaders(dataDir: string, csvDataFilename: string) {
  const csvDataFileStream = fs.createReadStream(path.join(dataDir, csvDataFilename))
  let csvDataFileHeaders: String[]
  csvDataFileStream
    // @ts-ignore
    .pipe(csv())
    .on('headers', (headers) => {
      csvDataFileHeaders = headers
    })

  return new Promise((resolve, reject) => {
    csvDataFileStream.on('end', () => resolve(csvDataFileHeaders));
    csvDataFileStream.on('error', reject);
  });

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


// 2022-09-23-CMF: Uncomment for testing this file (csv-parser.js/.ts)
/*
getCsvDataFileHeaders()
  .then((csvDataFileHeaders: any) => { console.log(csvDataFileHeaders) })
  .catch((err) => console.log(err))

*/
export default getCsvDataFileHeaders