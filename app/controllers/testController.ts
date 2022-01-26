import {Request, Response} from 'express'
import Files from "../models/files"
import {packager} from './packager'

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
  try {
      const file = await Files.findOne({ uuid: req.params.uuid });
      if(!file) {
          return res.render('download', { error: 'Link has expired.'});
      } 
      return res.render('download', { uuid: file.uuid, fileName: file.filename, fileSize: file.size, downloadLink: `${process.env.APP_BASE_URL}/api/files/download/${file.uuid}` });
  } catch(err) {
      return res.render('download', { error: 'Something went wrong.'});
  }
};

// datapacket creation
export const createData = async (req:Request, res:Response) =>{
  // accessing auth0 token and using it to pull authenticated email
  // from the token 
  const access_token = req.headers.authorization.split(' ')[1]
  const user_profile = await auth0.getProfile(access_token)

  // test array to create multiple csv files and pack them
  let test_array = ["geoIndicators","geoSpecies"]

  let test_return = packager(test_array, user_profile)

  // finish the request
  res.status(200).send({"request":"successful."})
}

//  actual download provider
export const getData = async (req:Request, res:Response)=>{
  const file = await Files.findOne({uuid: req.params.uuid})
  if (!file){
    return res.status(200).send("file no longer exists!")
  }
  const response = await file.save();
  const filePath = `${file.path}`;
  res.download(filePath)
}


