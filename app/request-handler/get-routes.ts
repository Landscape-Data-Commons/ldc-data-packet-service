// https://node-postgres.com/features/pooling

import {
        pool,
        pool2,
        pool3,
        pool4,
        pool5,
        pool6,
        pool7,
        pool8
      } from '../db/pg';

import path from 'path'
import fs from 'fs';

import { QueryGenerator, QueryParameters, PostParameters } from '../request-handler/queries';
import { gisDbTableNames } from '../request-handler/columns'; 


const queryGenerator = new QueryGenerator();
const delimiter = queryGenerator.delimiter

function poolSelector(request:any){
  const permissions = request.auth.payload.permissions
  if(
    !permissions.includes('read:NDOW') &&
    !permissions.includes('read:RHEM') &&
    !permissions.includes('read:NWERN')
  ){
    console.log(`Returnin unrestricted`)
    console.log(pool)
    return pool
  }else if(
    permissions.includes('read:NDOW') &&
    !permissions.includes('read:RHEM') &&
    !permissions.includes('read:NWERN')
  ){
    console.log(`Returnin NDOW`)
    console.log(pool2)
    return pool2
  }else if(
    !permissions.includes('read:NDOW') &&
    permissions.includes('read:RHEM') &&
    !permissions.includes('read:NWERN')
  ){
    console.log(`Returnin rhem`)
    console.log(pool3)
    return pool3
  }else if(
    !permissions.includes('read:NDOW') &&
    !permissions.includes('read:RHEM') &&
    permissions.includes('read:NWERN')
  ){
    console.log(`Returnin nwern`)
    console.log(pool4)
    return pool4
  } else if(
    permissions.includes('read:NDOW') &&
    permissions.includes('read:RHEM') &&
    !permissions.includes('read:NWERN')
  ){
    console.log(`Returnin ndow + rhem`)
    console.log(pool5)
    return pool5
  }else if(
    permissions.includes('read:NDOW') &&
    !permissions.includes('read:RHEM') &&
    permissions.includes('read:NWERN')
  ){
    return pool6
  } else if(
    !permissions.includes('read:NDOW') &&
    permissions.includes('read:RHEM') &&
    permissions.includes('read:NWERN')
  ){
    return pool7
  } else if(
    permissions.includes('read:NDOW') &&
    permissions.includes('read:RHEM') &&
    permissions.includes('read:NWERN')
  ){
    return pool8
  }
}

// 2022-02-15-CMF: Handle errors from database connection pool
pool.on('error', (err) => {  
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// 2022-02-15-CMF: Set headers for all GET responses
// 2022-03-17-CMF: TO DO --- ADAPT TO POST-REQUEST PROCESSING
function setHeaderFields(res: any): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
}

function extractPostParameters(request: any): PostParameters {
  const postParameters: PostParameters = {};
  for (let property of Object.keys(request.body.data)) {
    postParameters[property] = request.body.data[property]
  }
  console.log(postParameters)
  return postParameters;
}

// 2022-03-17-CMF: Send SQL query to database and return result 
async function getResult(selectStatement: string, request:any): Promise<any> {
  let result;
  let selPool = poolSelector(request)
  const client = await selPool.connect(); 
  try { result = (await client.query(selectStatement)).rows; } 
  finally { client.release() };
  return result;
}

// 2022-03-17-CMF: Write retrieved database table data to JSON file
function outputTableData(tableName: string, tableData: string) {
  const outFile = path.join('./output', tableName + ".json")
  fs.writeFile(outFile, JSON.stringify(tableData), 
               (err: any) => { if (err) { console.error(err) } }
  )
}

// 2022-03-17-CMF: Retrieve and print data for single database table
async function retrieveAndOutputTableData(
  tableName: string, 
  primaryKeys: PostParameters,
  request:any
  ) {
  let tableQuery = ''
  if (tableName === 'filterTable') {
    tableQuery = queryGenerator.selectAllFilterColumns(primaryKeys)
  }
  else {
    tableQuery = queryGenerator.selectAllTableColumns(primaryKeys, tableName)
  }
  // outputTableData(tableName, await getResult(tableQuery))

  // KBF instead of creating jsons, just returns the data
  let returnData = await getResult(tableQuery,request)
  return returnData
}

// 2022-03-17-CMF: Retrieve and print data for all database tables
function retrieveAndPrintAllTableData(primaryKeys: PostParameters, request:any) {
  // each returned table is stored in an object
  let obj = {}
  obj['filterTable'] = retrieveAndOutputTableData('filterTable', primaryKeys, request)
  for (let tableName of gisDbTableNames) {
    obj[tableName] = retrieveAndOutputTableData(tableName, primaryKeys, request)
  }
  // KBF the object full of tables is returned
  return obj
}

// 2022-03-15-CMF: Process and print returned database table data
// 2022-03-17-CMF: TO DO --- CONVERT GET PROCESSING TO POST PROCESSING
// router.get('/download-data', async (request, response, next) => {
//   try {
//     setHeaderFields(response);
//     response.status(200).json('Request received: processing');
//     retrieveAndPrintAllTableData(extractQueryParameters(request))
//   }
//   catch(err: any) { 
//     console.log(err)
//     next() 
//   }
// })

export { setHeaderFields,
        //  extractQueryParameters, 
         extractPostParameters,
         retrieveAndPrintAllTableData };