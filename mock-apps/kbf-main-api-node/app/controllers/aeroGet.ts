import {Request, Response} from 'express'
import JSONStream from 'JSONStream'
import QueryStream from 'pg-query-stream'
import {Pool} from 'pg'

const pool = new Pool({
  connectionString:process.env.DBSTR
})

export const getAeroData = (req:Request, res:Response) =>{
  
  let sql = `
      SELECT * 
      FROM aero_data."aero_runs"

  `
  let values = []
  let head = "WHERE "
  if (Object.keys(req.query).length!==0){
    let list = []
    let count = 1

    for(const [key,value] of Object.entries(req.query)){
      console.log(key,value)
      if(Array.isArray(value)){
        
        for (let i = 0; i<value.length; i++){
            let temp = `"aero_runs"."${key}" = $${count}`
            count+=1
            values.push(value[i])
            list.push(temp)
        }
      } else {

          let temp = `"aero_runs"."${key}" = $${count}`
          count+=1
          values.push(value)
          list.push(temp)    
        
      }
      
    }
    
    sql = sql + head + list.join(" AND ")
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