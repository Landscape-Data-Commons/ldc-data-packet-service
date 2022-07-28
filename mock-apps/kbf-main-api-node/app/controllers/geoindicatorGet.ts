import {Request, Response} from 'express'
import JSONStream from 'JSONStream'
import QueryStream from 'pg-query-stream'
import {Pool} from 'pg'
import { pairUp, coordPair } from '../config/utils'

const pool = new Pool({
  connectionString:process.env.DBSTR
})

export const getGeoInd = (req:Request, res:Response) =>{
  //parsing URL query parameters IF they exist
  let sql:string;
  const header_array = ['SpeciesState', 'ProjectKey']
 
  // console.log(Object.keys(req.query).some(r => geospe_array.includes(r)))
  sql = `
            SELECT "dataHeader".*, "geoIndicators".*
            FROM (
              SELECT * FROM "dataHeader" AS "dataHeader" 
              ) 
            AS "dataHeader" 
            LEFT OUTER JOIN "geoIndicators" AS "geoIndicators" 
              ON "dataHeader"."PrimaryKey" = "geoIndicators"."PrimaryKey"
            

            `
  let values:any[] = []
  let head = "WHERE "
  let defaultJoinVerb = " AND "
  if (Object.keys(req.query).length!==0){
    
    // let params = [req.query]
    let list = []
    // geospe_array = ["GrowthHabitSub","Noxious","GrowthHabit","Duration"]
    let count = 1

    for(const [key,value] of Object.entries(req.query)){
      if(key!=="limit"){
        let trick = (value as string).split(",") 
      
        if(Array.isArray(trick)){
          defaultJoinVerb = " OR "
          for (let i = 0; i<trick.length; i++){
            // console.log(count,"#1")
            // temp = `${key} = ${value[i]}`
            if(header_array.includes(key)){
              let temp = `"dataHeader"."${key}" = $${count}`
              count+=1
              values.push(trick[i])
              list.push(temp)
            } else {
              let temp = `"geoIndicators"."${key}" = $${count}`
              count+=1
              values.push(trick[i])
              list.push(temp)
            }
            
            
          }
        } else {
          defaultJoinVerb = " AND "
          // console.log(count,"#2")
          if(header_array.includes(key)){
            let temp = `"dataHeader"."${key}" = $${count}`
            count+=1
            values.push(value)
            list.push(temp)
          } else {
            let temp = `"geoIndicators"."${key}" = $${count}`
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
      return console.error(err)
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

export const getGeoIndicatorsCoords = (req:Request, res:Response) =>{
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
    let finalcoords = `geoind_json('${coordPair(pre)}')`
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

export const getGeoIndicatorsCoords_public = (req:Request, res:Response) =>{
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
    let finalcoords = `geoind_json_public('${coordPair(pre)}')`
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

export const getGeoIndicatorsCoords_loggedrestricted = (req:Request, res:Response) =>{
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
    let finalcoords = `geoind_json_nopermissions('${coordPair(pre)}')`
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

export const getGeoIndicatorsCoords_loggedrestricted_lmflimited = (req:Request, res:Response) =>{
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
    let finalcoords = `geoind_json_lmflimited('${coordPair(pre)}')`
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

export const getGeoIndicatorsCoords_loggedrestricted_datelimited = (req:Request, res:Response) =>{
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
    let finalcoords = `geoind_json_datelimited('${coordPair(pre)}')`
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