import * as dotenv from 'dotenv'
dotenv.config({path:'./app/config/.env'})

import {QueryTypes} from 'sequelize'
import express, {Request, Response} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express'
import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'


import {db} from './config/database'
import {DBObject} from './types/interfaces'
import stateRoutes from './routes/stateget'

const app = express()
app.use(express.json())
// jwks

const secretKey = jwksRsa.expressJwtSecret({
  cache: true,
  // rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://dev-mg6fdv6o.auth0.com/.well-known/jwks.json`
})
export const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: secretKey,

  // Validate the audience and the issuer.
  credentialsRequired:false,
  audience: 'http://localhost:5002',
  issuer: `https://dev-mg6fdv6o.auth0.com/`,
  algorithms: ['RS256']
});

// api docs
const swaggerOptions:SwaggerOptions = {
  swaggerDefinition: {
    info:{
      title: 'Tall tables API',
      description: 'API to serve to tall tables data',
      contact:{
        name:'kris'
      },
      servers:["http://localhost:5002/api/", "https://api.landscapedatacommons.org/api/"]
    }
  },
  apis:["./app/routes/*.ts"]
}

var swaggerUiOpts = {
  explorer: false,
  swaggerOptions: swaggerOptions,
  customCss: '.swagger-ui .topbar { display: none }'
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOpts))



db.sequelize.authenticate()
    .then(() => console.log('database connected...'))
    .catch((err:any) => console.log('error:'+ err));

app.use(cors())

app.use(helmet())

app.get('/',(req:Request, res:Response) => 
  res.send('ldc api up. update:10-8-2021:00:00')
)

app.get('/tables', (req:Request, res:Response)=>{
  db.sequelize.query(`
   select * from pg_catalog.pg_tables 
   where schemaname != 'pg_catalog' 
   and schemaname != 'information_schema'
   and schemaname != 'postgis'
   and schemaname != 'metdb'
   and schemaname != 'gis'
   
   ;`,{
    logging: console.log,
    plain: false,
    raw: true,
    type: QueryTypes.SELECT
    })
     .then((data:any[])=>{

       let result = data.map((a:DBObject)=>{
         if(!['dataTest','modis_classes','schemaTable'].includes(a.tablename)){
           return a.tablename
         }
       })
       let filtered = result.filter((value,index,arr)=>{ return value!==undefined })
       res.status(200).send(filtered)
     })
     .catch((err:any)=>{
       console.log(err)
     })
})

app.get('/schemas', (req:Request, res:Response)=>{
  console.log(req.query)
  let sql
  let initialVerb = `
  select * from gisdb.public."schemaTable"
  `
  console.log(objTest(initialVerb, req.query))

  db.sequelize.query(objTest(initialVerb, req.query),{
  
    logging: console.log,
    plain: false,
    raw: true,
    type: QueryTypes.SELECT
    })
     .then((data:any[])=>{
       res.status(200).send(data)
     })
     .catch((err:any)=>{
       console.log(err)
     })
})

let objTest = (initVerb:any, obj:any) =>{
  if(Object.keys(obj).length!==0){
    return sqlVerb(initVerb, obj)
  } else{
    return initVerb
  }
}

let sqlVerb =(verb:string, reqObj:{})=>{
  let sql = verb
  let values = []
  let head = "WHERE "
  let defaultJoinVerb = " AND "
  if (Object.keys(reqObj).length!==0){
    let list = []
    let count = 1

    for(const [key,value] of Object.entries(reqObj)){
      let trick = value
      
      if(Array.isArray(trick)){
        defaultJoinVerb = " OR "
        for (let i = 0; i<trick.length; i++){
          let temp = `"${key}" = '${trick[i]}'`
          count+=1
          values.push(trick[i])
          list.push(temp)
        }
      } else {
        defaultJoinVerb = " AND "
        let temp = `"${key}" = '${trick}'`
        count+=1
        values.push(value)
        list.push(temp)
      }
    }
    sql = sql + head + list.join(defaultJoinVerb)
    console.log(sql)
    return sql
  }
}

app.use('/api',checkJwt,stateRoutes)
app.listen(process.env.PORT || 5002)




