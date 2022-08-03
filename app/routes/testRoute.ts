import express from 'express'
import * as testController from '../controllers/testController'
import { authCheck } from "../middleware/auth"

import {
  claimCheck,
  JWTPayload,
  requiredScopes
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
        testController.createData
        );

router.put('/ndow', 
        authCheck, 
        requiredScopes('read:NDOW'),
        claimCheck((claim:Claim)=>{
          return (
            !claim.permissions.includes('read:NWERN') && 
            claim.permissions.includes('read:NDOW') &&
            !claim.permissions.includes('read:RHEM')
          )
        }),
          testController.createData
          );

router.put('/nwern', 
        authCheck, 
        requiredScopes('read:NWERN'),
        claimCheck((claim:Claim)=>{
          return (
            claim.permissions.includes('read:NWERN') && 
            !claim.permissions.includes('read:NDOW') &&
            !claim.permissions.includes('read:RHEM')
          )
        }),
        testController.createData
);

router.put('/rhem', 
        authCheck, 
        requiredScopes('read:RHEM'),
        claimCheck((claim:Claim)=>{
          return (
            !claim.permissions.includes('read:NWERN') && 
            !claim.permissions.includes('read:NDOW') &&
            claim.permissions.includes('read:RHEM')
          )
        }),
        testController.createData
);

router.put('/ndow-nwern', 
        authCheck, 
        requiredScopes('read:NWERN read:NDOW'),
        claimCheck((claim:Claim)=>{
          return (
            claim.permissions.includes('read:NWERN') && 
            claim.permissions.includes('read:NDOW') &&
            !claim.permissions.includes('read:RHEM')
          )
        }),
        testController.createData
);
 
router.put('/ndow-rhem', 
        authCheck, 
        requiredScopes('read:NDOW read:RHEM'),
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
        requiredScopes('read:NWERN read:RHEM'),
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
        requiredScopes('read:NWERN read:NDOW read:RHEM'),
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