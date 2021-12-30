require('dotenv').config();
import mongoose from "mongoose"


export const connect = () => {
  mongoose.connect(
    process.env.MONGOPATH,
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