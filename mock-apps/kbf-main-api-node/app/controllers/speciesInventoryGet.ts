import {Request, Response} from 'express'
import JSONStream from 'JSONStream'
import QueryStream from 'pg-query-stream'
import {Pool} from 'pg'
import { pairUp, coordPair } from '../config/utils'

const pool = new Pool({
  connectionString:process.env.DBSTR
})

export const getSpeciesInv = (req:Request, res:Response) =>{
  const header_array = ['SpeciesState',
                        'PlotID',
                        'PlotKey',
                        'EcologicalSiteId',
                        'Latitude_NAD83',
                        'Longitude_NAD83',
                        'State',
                        'County',
                        'DateEstablished',
                        'ProjectName',
                        'LocationType',
                        'DateVisited',
                        'PercentCoveredByEcoSite']
  let sql = `
            SELECT "dataHeader".*, "dataSpeciesInventory".* 
            FROM (
              SELECT * FROM "dataHeader" AS "dataHeader" 
              ) 
            AS "dataHeader" 
            LEFT OUTER JOIN "dataSpeciesInventory" AS "dataSpeciesInventory" 
              ON "dataHeader"."PrimaryKey" = "dataSpeciesInventory"."PrimaryKey"
            `
let values:any[] = []
let head = "WHERE "
let defaultJoinVerb = " AND "
if (Object.keys(req.query).length!==0){
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
            let temp = `"dataSpeciesInventory"."${key}" = $${count}`
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
          let temp = `"dataSpeciesInventory"."${key}" = $${count}`
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
pool.connect((err,client, release)=>{

  res.contentType('application/json')
  if(err){
    return console.error("error ")
  }

  if (Object.keys(req.query).length!==0){

    const query = new QueryStream(sql, values)
    const stream = client.query(query)
    stream.on('end',release)
    stream.pipe(JSONStream.stringify()).pipe(res)

    } else{
      const query = new QueryStream(sql)
      const stream = client.query(query)

      stream.on('end',release)
      stream.pipe(JSONStream.stringify()).pipe(res)
    }
  })
}

export const getSpeciesInventoryCoords = (req:Request, res:Response) =>{
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
    let finalcoords = `specinv_json('${coordPair(pre)}')`
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

export const getSpeciesInventoryCoords_public = (req:Request, res:Response) =>{
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
    let finalcoords = `specinv_json_public('${coordPair(pre)}')`
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

export const getSpeciesInventoryCoords_loggedrestricted = (req:Request, res:Response) =>{
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
    let finalcoords = `specinv_json_nopermissions('${coordPair(pre)}')`
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

export const getSpeciesInventoryCoords_loggedrestricted_lmflimited = (req:Request, res:Response) =>{
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
    let finalcoords = `specinv_json_lmflimited('${coordPair(pre)}')`
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

export const getSpeciesInventoryCoords_loggedrestricted_datelimited = (req:Request, res:Response) =>{
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
    let finalcoords = `specinv_json_datelimited('${coordPair(pre)}')`
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