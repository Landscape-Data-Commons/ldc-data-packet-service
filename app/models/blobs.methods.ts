import {Document} from 'mongoose'
import { IBlobDocument } from '../interfaces/blob.types'

export async function setBlobContent(this:IBlobDocument):
Promise<void>{
  const now = ''
  if (!this.blob||null){
    this.blob = 'kk'
    await this.save()
  }
}