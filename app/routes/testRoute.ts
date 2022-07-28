import express from 'express'
import * as testController from '../controllers/testController'
import { checkJwt } from "../auth.middleware";
const jwtAuthz = require('express-jwt-authz');
const AuthClient = require('auth0').AuthenticationClient

const auth0 = new AuthClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
})

const router = express.Router()

//  direct download link 
router.get('/files/download/:uuid', testController.getData)
//  development post route
// router.post('/files', testController.createData)



// download page route (returned from created db entry)
router.get('/files/:uuid', testController.showData)




// router.use(verifyJwt)
// axios route
router.put('/download-data', testController.createData)

////////////////////////////////////////////////////////
// new routes with scope restriction

router.put('/unrestricted', function (req, res) {
  const primaryKeys = req.body;
  // const userId = req.user['http://localhost:3002/email'];
  console.log(primaryKeys)

  // CMF: Add query-processing and email processing

  res.status(200).send();
});

router.put('/ndow', 
        checkJwt, 
        // jwtAuthz(['read:NDOW']), 
        async function (req, res) {
  const access_token = req.headers.authorization.split(' ')[1]
  
  const user_profile = await auth0.getProfile(access_token)
  const primaryKeys = req.body;
  // const userId = req.user['http://localhost:3002/email'];
  console.log(req.body)
  console.log(user_profile)

  // CMF: Add query-processing and email processing

  res.status(200).send();
});

router.put('/nwern', 
        checkJwt, 
        jwtAuthz(['read:NWERN'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  // const userId = req.user['http://localhost:3002/email'];
  console.log(primaryKeys)

  // CMF: Add query-processing and email processing

  res.status(200).send();
});

router.put('/rhem', 
        checkJwt, 
        jwtAuthz(['read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  // const userId = req.user['http://localhost:3002/email'];
        
  // CMF: Add query-processing and email processing
        
  res.status(200).send();
});

router.put('/ndow-nwern', checkJwt, 
        jwtAuthz(['read:NDOW', 'read:NWERN'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  // const userId = req.user['http://localhost:3002/email'];
  console.log(primaryKeys)
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});
 
router.put('/ndow-rhem', checkJwt, 
        jwtAuthz(['read:NDOW', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  // const userId = req.user['http://localhost:3002/email'];
  console.log(primaryKeys)
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});

router.put('/nwern-rhem', checkJwt, 
        jwtAuthz(['read:NWERN', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  // const userId = req.user['http://localhost:3002/email'];
  console.log(primaryKeys)
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});

router.put('/ndow-nwern-rhem', 
        checkJwt, 
        jwtAuthz(['read:NDOW', 'read:NWERN', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  // const userId = req.user['http://localhost:3002/email'];
  console.log(primaryKeys)
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});

// mini api routes
// http://localhost:5432/api/download-data?primaryKeys=17101012114127892017-09-01

// 


export default router