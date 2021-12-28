import mongoose, { Schema,Document } from 'mongoose';

 export interface TestText extends Document {
     test: String;
 }

 const TestSchema : Schema = new Schema({
     test : {
         type : String,
         required : true,
     },

 });

 export default mongoose.model<TestText>('Test',TestSchema);