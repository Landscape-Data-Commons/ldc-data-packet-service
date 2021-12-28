// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation

export default class Blob {
  constructor(
    public name: string, 
    public id?: ObjectId
    ) {}
}