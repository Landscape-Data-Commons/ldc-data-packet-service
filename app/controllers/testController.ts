import {Request, Response} from 'express'
import axios from 'axios'
import JSZip from 'jszip'

import multer from 'multer'
import path from 'path'
import Files from "../models/files"
const { v4: uuidv4 } = require('uuid')
import saveAs from 'file-saver';
import fs from 'fs'
import auth from 'auth0'

import {packager} from './packager'

const nodemailer = require('nodemailer')

const AuthClient = require('auth0').AuthenticationClient
// import * as authConfig from './auth_config.json'
const authConfig = require('./auth_config.json')
const auth0 = new AuthClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
})
////
// on request to this api: 
// pull data from main api 
// package it into zip file 

// storing inside container local diskstorage (only through post/multipart file)
let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '/usr/src/app/temp'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  }
})

let upload = multer({storage, limits: {fileSize: 1000000 * 100 }, }).single('myfile')

// find mongo referenced file in local filesystem
export const showData = async (req, res) => {
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

// send file (and create entry on mongo) thru post query
// only for dev
export const createData = async (req:Request, res:Response) =>{

  upload(req, res, async(err)=>{
    if(err){
      return res.status(500).send({ error: err.message })
    }
    const file = new Files({
      // filename: req.file.filename,
      // uuid: uuidv4(),
      // path: req.file.path,
      // size: req.file.size
    })
    const response = await file.save()
    res.json({ file: `${process.env.APP_BASE_URL}/api/files/${response.uuid}` })
  })
}


export const createData2 = async (req:Request, res:Response) =>{
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


export const getData = async (req:Request, res:Response)=>{
  const file = await Files.findOne({uuid: req.params.uuid})
  if (!file){
    return res.status(200).send("file no longer exists!")
  }
  const response = await file.save();
  const filePath = `${file.path}`;
  res.download(filePath)
}


