import {model} from "mongoose"
import { IBlobDocument } from "../interfaces/blob.types"
import BlobSchema from "../schemas/blobs.schema"

export const BlobModel = model<IBlobDocument>("blob",BlobSchema)