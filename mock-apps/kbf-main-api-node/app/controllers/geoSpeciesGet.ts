import {Request, Response} from 'express'
import JSONStream from 'JSONStream'
import QueryStream from 'pg-query-stream'
import {Pool} from 'pg'
import { pairUp, coordPair } from '../config/utils'

const pool = new Pool({
  connectionString:process.env.DBSTR
})

export const getSpecies = (req:Request, res:Response) =>{

  const header_array = [ 'SpeciesState', 
                        'PlotKey',
                        'EcologicalSiteId',
                        'Latitude_NAD83',
                        'Longitude_NAD83',
                        'State',
                        'County',
                        'DateEstablished',
                        'ProjectName',
                        'ProjectKey',
                        'LocationType',
                        'DateVisited',
                        'PercentCoveredByEcoSite']
  
    let sql = `
    SELECT "dataHeader".*, "geoSpecies".* 
    FROM (
      SELECT * FROM "dataHeader" AS "dataHeader" 
      ) 
    AS "dataHeader" 
    LEFT OUTER JOIN "geoSpecies" AS "geoSpecies" 
    ON "dataHeader"."PrimaryKey" = "geoSpecies"."PrimaryKey"
    `
    // console.log(req.query)
    let values: any[] = []
    let head = "WHERE "
    let defaultJoinVerb = " AND "
    if (Object.keys(req.query).length!==0){
      
      // let params = [req.query]
      let list = []
      let count = 1
      for(const [key,value] of Object.entries(req.query)){
  
        if(key!=="limit"){
          let trick = (value as string).split(",")
        
          if(Array.isArray(trick)){
            defaultJoinVerb = " OR "
            for (let i = 0; i<trick.length; i++){
              if(header_array.includes(key)){
                  let temp = `"dataHeader"."${key}" = $${count}`
                  count+=1
                  values.push(trick[i])
                  list.push(temp)
              } else {
                  let temp = `"geoSpecies"."${key}" = $${count}`
                  count+=1
                  values.push(trick[i])
                  list.push(temp)
              }
            }
          } else {
            defaultJoinVerb = " AND "
            if(header_array.includes(key)){
                  let temp = `"dataHeader"."${key}" = $${count}`
                  count+=1
                  values.push(value)
                  list.push(temp)
            } else {
              
              let temp = `"geoSpecies"."${key}" = $${count}`
              count+=1
              values.push(value)
              list.push(temp)
            }
            
  
          }
        }
        
      }
      if(Object.keys(req.query).length===1 && Object.keys(req.query).includes("limit")){
        sql = sql 
      } else {
        sql = sql + head + list.join(defaultJoinVerb)
      }
      if(Object.keys(req.query).includes("limit")){
        let limitNum = parseInt(req.query['limit'] as string)
        sql = sql + ` limit ${limitNum}`
      }
      console.log(sql)
    }
    
    pool.connect((err, client, release)=>{
  
      res.contentType('application/json')
      if(err){
        return console.error("error ")
      }
      if (Object.keys(req.query).length!==0){
  
        const query = new QueryStream(sql, values)
        const stream = client.query(query)
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
  
      } else {
  
        const query = new QueryStream(sql)
        const stream = client.query(query)
  
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
  
      }
    })
  }

export const getGeoSpeciesCoords = (req:Request, res:Response) =>{
  let sql = `
    SELECT * 
      FROM 
    `
  for(const [key,value] of Object.entries(req.query)){
    // console.log(value)
    let bufferObj = Buffer.from(value as string, 'base64')
    let decoded = bufferObj.toString("utf-8")
    let usefulCoords = decoded.split(",").map(Number)
    console.log(usefulCoords)
    let pre = pairUp(usefulCoords)
    let finalcoords = `geospe_json('${coordPair(pre)}')`
    sql = sql + finalcoords
    console.log(sql)

    pool.connect((err,client, release)=>{
      res.contentType('application/json')
      if(err){
        return console.error("error ")
      }
      if (Object.keys(req.query).length!==0){
  
        const query = new QueryStream(sql)
        const stream = client.query(query)
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
      } else {
        const query = new QueryStream(sql)
        const stream = client.query(query)
  
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
      }
    })
  }
}

export const getGeoSpeciesCoords_public = (req:Request, res:Response) =>{
  let sql = `
    SELECT * 
      FROM 
    `
  for(const [key,value] of Object.entries(req.query)){
    // console.log(value)
    let bufferObj = Buffer.from(value as string, 'base64')
    let decoded = bufferObj.toString("utf-8")
    let usefulCoords = decoded.split(",").map(Number)
    console.log(usefulCoords)
    let pre = pairUp(usefulCoords)
    let finalcoords = `geospe_json_public('${coordPair(pre)}')`
    sql = sql + finalcoords
    console.log(sql)

    pool.connect((err,client, release)=>{
      res.contentType('application/json')
      if(err){
        return console.error("error ")
      }
      if (Object.keys(req.query).length!==0){
  
        const query = new QueryStream(sql)
        const stream = client.query(query)
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
      } else {
        const query = new QueryStream(sql)
        const stream = client.query(query)
  
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
      }
    })
  }
}

export const getGeoSpeciesCoords_loggedrestricted = (req:Request, res:Response) =>{
  let sql = `
    SELECT * 
      FROM 
    `
  for(const [key,value] of Object.entries(req.query)){
    // console.log(value)
    let bufferObj = Buffer.from(value as string, 'base64')
    let decoded = bufferObj.toString("utf-8")
    let usefulCoords = decoded.split(",").map(Number)
    console.log(usefulCoords)
    let pre = pairUp(usefulCoords)
    let finalcoords = `geospe_json_nopermissions('${coordPair(pre)}')`
    sql = sql + finalcoords
    console.log(sql)

    pool.connect((err,client, release)=>{
      res.contentType('application/json')
      if(err){
        return console.error("error ")
      }
      if (Object.keys(req.query).length!==0){
  
        const query = new QueryStream(sql)
        const stream = client.query(query)
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
      } else {
        const query = new QueryStream(sql)
        const stream = client.query(query)
  
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
      }
    })
  }
}

export const getGeoSpeciesCoords_loggedrestricted_lmflimited = (req:Request, res:Response) =>{
  let sql = `
    SELECT * 
      FROM 
    `
  for(const [key,value] of Object.entries(req.query)){
    // console.log(value)
    let bufferObj = Buffer.from(value as string, 'base64')
    let decoded = bufferObj.toString("utf-8")
    let usefulCoords = decoded.split(",").map(Number)
    console.log(usefulCoords)
    let pre = pairUp(usefulCoords)
    let finalcoords = `geospe_json_lmflimited('${coordPair(pre)}')`
    sql = sql + finalcoords
    console.log(sql)

    pool.connect((err,client, release)=>{
      res.contentType('application/json')
      if(err){
        return console.error("error ")
      }
      if (Object.keys(req.query).length!==0){
  
        const query = new QueryStream(sql)
        const stream = client.query(query)
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
      } else {
        const query = new QueryStream(sql)
        const stream = client.query(query)
  
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
      }
    })
  }
}

export const getGeoSpeciesCoords_loggedrestricted_datelimited = (req:Request, res:Response) =>{
  let sql = `
    SELECT * 
      FROM 
    `
  for(const [key,value] of Object.entries(req.query)){
    // console.log(value)
    let bufferObj = Buffer.from(value as string, 'base64')
    let decoded = bufferObj.toString("utf-8")
    let usefulCoords = decoded.split(",").map(Number)
    console.log(usefulCoords)
    let pre = pairUp(usefulCoords)
    let finalcoords = `geospe_json_datelimited('${coordPair(pre)}')`
    sql = sql + finalcoords
    console.log(sql)

    pool.connect((err,client, release)=>{
      res.contentType('application/json')
      if(err){
        return console.error("error ")
      }
      if (Object.keys(req.query).length!==0){
  
        const query = new QueryStream(sql)
        const stream = client.query(query)
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
      } else {
        const query = new QueryStream(sql)
        const stream = client.query(query)
  
        stream.on('end',release)
        stream.pipe(JSONStream.stringify()).pipe(res)
      }
    })
  }
}