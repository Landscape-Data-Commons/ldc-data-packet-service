import express from 'express'
import * as testController from '../controllers/testController'
import { authCheck } from "../middleware/auth"

import {
  claimCheck,
  JWTPayload
} from 'express-oauth2-jwt-bearer';

interface Claim extends JWTPayload {
  permissions: string[]
}


const router = express.Router()

//  direct download link 
router.get('/files/download/:uuid', testController.getData)

// download page route (returned from created db entry)
router.get('/files/:uuid', testController.showData)

// development route that downloads with authentication.
// authorization is not implemented.
router.put('/download-data', testController.createData)

////////////////////////////////////////////////////////
// START of routes with authentication + authorization

router.put('/unrestricted', 
        // authCheck = auth function of the express-oauth2-jwt-bearer package
        // docs = https://auth0.github.io/node-oauth2-jwt-bearer/index.html#auth
        authCheck, 
        // claimCheck: function of the express-oauth2-jwt-bearer package that 
        //             checks claims(properties inside of the JWTPayload object) on a token
        // docs = https://auth0.github.io/node-oauth2-jwt-bearer/index.html#claimcheck
        claimCheck((claim:Claim)=>{
          return (
            !claim.permissions.includes('read:NWERN') && 
            !claim.permissions.includes('read:NDOW') &&
            !claim.permissions.includes('read:RHEM')
          ) // returns true if all the permissions are absent
        }),
          async function (req, res, next) {
            // console.log(req.auth) // prints debug information from auth0
            console.log(req.body) // prints put payload 
    res.status(200).send();
  });

router.put('/ndow', 
        authCheck, 
        claimCheck((claim:Claim)=>{
          return (
            !claim.permissions.includes('read:NWERN') && 
            claim.permissions.includes('read:NDOW') &&
            !claim.permissions.includes('read:RHEM')
          )
        }),
        async function (req, res, next) {
  
          console.log(req.auth)
          console.log(req.body)
  res.status(200).send();
});


router.put('/nwern', 
        authCheck, 
        claimCheck((claim:Claim)=>{
          return (
            !claim.permissions.includes('read:NWERN') && 
            claim.permissions.includes('read:NDOW') &&
            !claim.permissions.includes('read:RHEM')
          )
        }),
        async function (req, res, next) {
  
          console.log(req.auth)
          console.log(req.body)
  res.status(200).send();
});

router.put('/rhem', 
        authCheck, 
        claimCheck((claim:Claim)=>{
          return (
            !claim.permissions.includes('read:NWERN') && 
            !claim.permissions.includes('read:NDOW') &&
            claim.permissions.includes('read:RHEM')
          )
        }),
        async function (req, res, next) {
  
          console.log(req.auth)
          console.log(req.body)
  res.status(200).send();
});

router.put('/ndow-nwern', 
        authCheck, 
        claimCheck((claim:Claim)=>{
          return (
            claim.permissions.includes('read:NWERN') && 
            claim.permissions.includes('read:NDOW') &&
            !claim.permissions.includes('read:RHEM')
          )
        }),
        async function (req, res, next) {
  
          console.log(req.auth)
          console.log(req.body)
  res.status(200).send();
});
 
router.put('/ndow-rhem', 
        authCheck, 
        claimCheck((claim:Claim)=>{
          return (
            !claim.permissions.includes('read:NWERN') && 
            claim.permissions.includes('read:NDOW') &&
            claim.permissions.includes('read:RHEM')
          )
        }),
        async function (req, res, next) {
  
          console.log(req.auth)
          console.log(req.body)
  res.status(200).send();
});

router.put('/nwern-rhem', 
        authCheck, 
        claimCheck((claim:Claim)=>{
          return (
            !claim.permissions.includes('read:NWERN') && 
            claim.permissions.includes('read:NDOW') &&
            claim.permissions.includes('read:RHEM')
          )
        }),
        async function (req, res, next) {
  
          console.log(req.auth)
          console.log(req.body)
  res.status(200).send();
});

router.put('/ndow-nwern-rhem', 
        authCheck, 
        claimCheck((claim:Claim)=>{
          return (
            claim.permissions.includes('read:NWERN') && 
            claim.permissions.includes('read:NDOW') &&
            claim.permissions.includes('read:RHEM')
          )
        }),
        async function (req, res, next) {
  
          console.log(req.auth)
  res.status(200).send();
});

// mini api routes
// http://localhost:5432/api/download-data?primaryKeys=17101012114127892017-09-01

// 


export default router