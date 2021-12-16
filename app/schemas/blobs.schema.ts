import {Schema} from 'mongoose'
import { 
  findOneOrCreate, 
  // findByDate 
} from "../models/blobs.static"
import { setBlobContent } from "../models/blobs.methods"

const BlobSchema = new Schema({
  ident: String,
  blob: String,
  creationDate: {
    type: Date,
    default: new Date()
  }
})

BlobSchema.statics.findOneOrCreate = findOneOrCreate;
// BlobSchema.statics.findByDate = findByDate;

BlobSchema.methods.setBlobContent = setBlobContent

export default BlobSchema