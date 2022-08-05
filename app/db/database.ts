import mongoose from "mongoose"
import secrets from './secrets'

export const connect = () => {
  mongoose.connect(
    secrets.read('cron_mongopath')||process.env.MONGOPATH,
    {
      // useNewUrlParser:true,
      // useFindAndModify:false
    }
   )
   const connection = mongoose.connection
   connection.once('open', ()=>{
     console.log('db connected')
     connection.on('connected',()=>{
       console.log('mongo event connected')
     })
     connection.on('error',(err)=>{
       console.log(err)
     })
   })
  }