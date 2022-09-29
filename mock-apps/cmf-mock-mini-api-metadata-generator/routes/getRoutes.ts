// https://node-postgres.com/features/pooling

import pg from 'pg';
import express from 'express';

import { loginInfo } from '../database/loginInfo.js';
import { QueryGenerator, QueryParameters } from '../database/queries.js';

const router = express.Router();
const pool = new pg.Pool(loginInfo);

const queryGenerator = new QueryGenerator();
const delimiter = /,(?!\s)/

// 2022-02-15-CMF: Handle errors from the database connection pool
pool.on('error', (err) => {  
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// 2022-02-15-CMF: Used for all responses
function setHeaderFields(res: any): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
}

// 2022-02-15-CMF: Used to parse and extract query parameters from all requests 
function extractQueryParameters(request: any): QueryParameters {
  const queryParameters: QueryParameters = {};
  // console.log(request.query)
  for (let property in request.query) {
    queryParameters[property] = request.query[property].split(delimiter)
  }
  //console.log(queryParameters)
  return queryParameters;
}

// 2022-02-15-CMF: Used to query database for each request
async function getResult(selectStatement: string): Promise<any> {
  let result;
  const client = await pool.connect(); 
  try { result = (await client.query(selectStatement)).rows; } 
  finally { client.release() };
  return result;
}

// 2022-02-15-CMF: Used for initially populating plot markers on web-portal map (also returns PrimaryKey)
//                 See Postman tests for examples
router.get('/geoindicators/latitude-longitude', async (request, response, next) => {
  try {
    setHeaderFields(response);
    // 2022-02-10-CMF: Query parameters added for Postman testing
    response.status(200).json(
      await getResult(
        queryGenerator.selectLatLonRounded(extractQueryParameters(request))
      )
    );
  }
  catch(err: any) { 
    console.log(err)
    next() 
  }
})

// 2022-02-16-CMF: Used to retrieve all data for filter (i.e., selector/indicator) requests;
//                 includes only query parameter for PrimaryKey values (e.g., from polygon selection)
//                 See Postman tests for examples
router.get('/geoindicators/all-filter-columns', async (request, response, next) => {
  try {
    setHeaderFields(response);
    response.status(200).json(
      await getResult(
        queryGenerator.selectAllFilterColumns(extractQueryParameters(request))
      )
    )
  }
  catch(err: any) { 
    next() 
  }
})
// 2022-02-16-CMF: Used for filter (i.e., selector/indicator) requests with restrictions; includes
//                 query parameters for combinations of filters 
//                 See Postman tests for examples
router.get('/geoindicators/adjusted-filter-columns', async (request, response, next) => {
  try {
    setHeaderFields(response);
    response.status(200).json(
      await getResult(
        queryGenerator.selectAdjustedFilterColumns(extractQueryParameters(request))
      )
    )
  }
  catch(err: any) { next() }
}) 

// 2022-02-16-CMF: Used to retrieve PrimaryKey values stored on client for row-restricted processing
//                 See Postman tests for examples
router.get('/geoindicators/adjusted-filter-columns/primary-keys-only', async (request, response, next) => {
  try {
    setHeaderFields(response);
    response.status(200).json( 
      await getResult(
        queryGenerator.selectPrimaryKeysForAdjustedFilterColumns(extractQueryParameters(request))
      ) 
    )
  }
  catch(err: any) {
    next() 
  }
}) 

// 2022-02-16-CMF: Used to retrieve all column values for geoindicators table using PrimaryKey values
//                 See Postman tests for examples
router.get('/geoindicators', async (request, response, next) => {
  try {
    setHeaderFields(response);
    response.status(200).json(
      await getResult(
        queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'geoIndicators')
      )
    )
  }
  catch(err: any) { 
    next() 
  }
}) 

// 2022-02-16-CMF: Used to retrieve all column values for geoSpecies table using PrimaryKey values
//                 See Postman tests for examples
router.get('/geospecies', async (request, response, next) => {
  try {
    setHeaderFields(response);
    response.status(200).json(
      await getResult(
        queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'geoSpecies')
      )
    )
  }
  catch(err: any) { 
    next() 
  }
}) 

// 2022-02-16-CMF: Used to retrieve all column values for dataSpeciesInventory table using PrimaryKey values
//                 See Postman tests for examples
router.get('/data-species-inventory', async (request, response, next) => {
  try {
    setHeaderFields(response);
    response.status(200).json(
      await getResult(
        queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'dataSpeciesInventory')
      )
    )
  }
  catch(err: any) { 
    next() 
  }
})

// 2022-02-16-CMF: Used to retrieve all column values for dataLPI table using PrimaryKey values
//                 See Postman tests for examples
router.get('/data-lpi', async (request, response, next) => {
  try {
    setHeaderFields(response);
    response.status(200).json(
      await getResult(
        queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'dataLPI')
      )
    )
  }
  catch(err: any) { 
    next() 
  }
}) 

// 2022-02-16-CMF: Used to retrieve all column values for dataGap table using PrimaryKey values
//                 See Postman tests for examples
router.get('/data-gap', async (request, response, next) => {
  try {
    setHeaderFields(response);
    response.status(200).json(
      await getResult(
        queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'dataGap')
      )
    )
  }
  catch(err: any) { 
    next() 
  }
}) 

// 2022-02-16-CMF: Used to retrieve all column values for dataHeight table using PrimaryKey values
//                 See Postman tests for examples
router.get('/data-height', async (request, response, next) => {
  try {
    setHeaderFields(response);
    response.status(200).json(
      await getResult(
        queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'dataHeight')
      )
    )
  }
  catch(err: any) { 
    next() 
  }
}) 

// 2022-02-16-CMF: Used to retrieve all column values for dataSoilStability table using PrimaryKey values
//                 See Postman tests for examples
router.get('/data-soil-stability', async (request, response, next) => {
  try {
    setHeaderFields(response);
    response.status(200).json(
      await getResult(
        queryGenerator.selectAllTableColumns(extractQueryParameters(request), 'dataSoilStability')
      )
    )
  }
  catch(err: any) { 
    next() 
  }
}) 

// 2022-06-08-CMF-TODO: Add AERO request-processing code (NOTE: NEED AERO DATA COLUMNS IN GEOINDICATORS TABLE)

export { router };