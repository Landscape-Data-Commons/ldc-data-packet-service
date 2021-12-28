import * as mongoDB from "mongodb"
import mongoose from "mongoose"

// export const collections: { blobs?: mongoDB.Collection} = {}

export async function connect() {
  mongoose.connect(
    'mongodb://rootuser:example@mongo:27017',
    {
      // useNewUrlParser:true,
      // useFindAndModify:false
    }
   )
   .then(()=>console.log('mongodb connected'))
   .catch(err=>console.log(err))
  }