import {Document, Model} from 'mongoose'

export interface IBlob{
  ident: string;
  blob:string;
  creationDate:Date;
}
export interface IBlobDocument extends IBlob, Document {
  setBlobContent: (this: IBlobDocument) => Promise<void>
}

export interface IBlobModel extends Model<IBlobDocument>{
  findOneOrCreate: (
    {
      ident,
      blob,
      creationDate,
    }: {ident:string; blob:string; creationDate:Date}
  ) => Promise<IBlobDocument>;
  // findByDate:(
  //   min?:Date,
  //   max?:Date
  // ) => Promise<IBlobDocument[]>
}