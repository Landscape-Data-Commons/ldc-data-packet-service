import { IBlobDocument, IBlobModel } from "../interfaces/blob.types";

export async function findOneOrCreate(
  blobId:string
):Promise<IBlobDocument>{
  const record=await this.findOne({blobId})
  if(record){
    return record
  } else {
    return this.create({blobId})
  }
}

// export async function findByDate(
//   min?:Date,
//   max?:Date
// ):Promise<IBlobDocument[]>{
//   return this.find({creationDate:{ $gte:min||null, $lte:max||null }
//   })
// }