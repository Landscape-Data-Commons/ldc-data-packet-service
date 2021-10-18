import {Request, Response} from 'express'
import axios from 'axios'
import JSZip from 'jszip'
import * as Mongoose from "mongoose";


////
// on request to this api: 
// pull data from main api 
// package it into zip file 
// store zip file in mongo with a temp hash as key + time to live of 1 day
// create an endpoint that will use the hash to pull the mongodb data: www.ldc.org/file/543gerdgd4 and download will commence
export const getData = (req:Request, res:Response)=>{
  axios.get('https://api.landscapedatacommons.org/api/geoIndicators?limit=5') // test
  .then(data=>{
    creatingCSVs(data.data)
    // res.send(data.data)
  })
  


}

const creatingCSVs = (myObj) =>{
  //  create csv from db json
}

const zipCSV = (csvBlob) =>{
  //  create zip from csv
}
