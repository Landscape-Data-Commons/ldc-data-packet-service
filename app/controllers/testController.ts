require('dotenv').config();
import {NextFunction, Request, Response} from 'express'
import Files from "../models/files"
import {packager} from './packager'
import {setHeaderFields} from '../request-handler/get-routes'
import secrets from '../db/secrets'
import { newpackager } from './newpackager';
import fs from 'fs'

import { CognitoJwtVerifier } from 'aws-jwt-verify';


const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: 'us-west-1_FgaW15JOh',
  tokenUse: 'id',
  clientId: '3ocfhcl3smtnnu6m0qkne8v8tg',
});

const AuthClient = require('auth0').AuthenticationClient

const auth0 = new AuthClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
})
////
// on request to this api: 
// pull data from main api 
// package it into zip file 

// download link page route
export const showData = async (req, res) => {
  // 
  let dl_link = process.env.APP_BASE_URL
  try {
      const file = await Files.findOne({ uuid: req.params.uuid });
      if(!file) {
          return res.render('download', { error: 'Link has expired.'});
      } 
      return res.render('download', { uuid: file.uuid, fileName: file.filename, fileSize: file.size, downloadLink: `${dl_link}/api/files/download/${file.uuid}` });
  } catch(err) {
      return res.render('download', { error: 'Something went wrong.'});
  }
};

// datapacket creation
export const createData = async (req:Request, res:Response, next: NextFunction) =>{

  const responseMetadata = await res.locals.test
  const access_token = req.auth.token  
  const user_profile = await auth0.getProfile(access_token)

  // test array to create multiple csv files and pack them
  try{
    console.log(responseMetadata, "controller")
    newpackager(req,user_profile, responseMetadata)
    console.log("todavia no")
  }
  catch(err: any){
    console.log(err)
    next()
  }
}

export const responseData = async (req, res, next) => {
  console.log("llegue pre pre")
  res.status(200).send({"response":"okkk"})
  // setTimeout(x=>{
  //   console.log("lleuge pre")
  //   if(res.locals.respObj){
  //     console.log(res.locals.respObj)
  //     res.status(418).send({"response":"okkk"})
  //   }
  // }
  //   , 1000)
  
}

//  actual download provider
export const getData = async (req:Request, res:Response)=>{
  const file = await Files.findOne({uuid: req.params.uuid})
  if (!file){
    return res.status(200).send("file no longer exists!")
  }
  
  const filePath = `${file.path}`;
  res.download(filePath)
}

interface File {
  user_email: string 
  filename: string 
  path: string 
  size: string
  uuid: string
  creator?: string | undefined
}

export const fileExists = async (req:Request, res: Response)=>{
  console.log(req.params.uuid)
  const file = await Files.findOne({uuid: req.params.uuid})

  let filePath
  if(file!==null){
    filePath = `${file.path}`;
  } else {
    return res.status(200).send({"err":"file has never been created"})
  }
  

  if(!fs.existsSync(filePath)){
    return res.status(200).send({"exists":false})
  } else {
    return res.status(200).send({"exists":true})
  }
}

