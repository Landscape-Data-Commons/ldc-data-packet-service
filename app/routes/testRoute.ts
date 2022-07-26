import express from 'express'
import * as testController from '../controllers/testController'
import { checkJwt } from "../auth.middleware";
const jwtAuthz = require('express-jwt-authz');

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
  const userId = req.user['http://localhost:3002/email'];

  // CMF: Add query-processing and email processing

  res.status(200).send();
});

router.put('/nri', 
        checkJwt, 
        jwtAuthz(['read:NRI'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];

  // CMF: Add query-processing and email processing

  res.status(200).send();
});

router.put('/nwern', 
        checkJwt, 
        jwtAuthz(['read:NWERN'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];

  // CMF: Add query-processing and email processing

  res.status(200).send();
});

router.put('/rhem', 
        checkJwt, 
        jwtAuthz(['read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];
        
  // CMF: Add query-processing and email processing
        
  res.status(200).send();
});

router.put('/nri-nwern', checkJwt, 
        jwtAuthz(['read:NRI', 'read:NWERN'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});
 
router.put('/nri-rhem', checkJwt, 
        jwtAuthz(['read:NRI', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});

router.put('/nwern-rhem', checkJwt, 
        jwtAuthz(['read:NWERN', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});

router.put('/nri-nwern-rhem', 
        checkJwt, 
        jwtAuthz(['read:NRI', 'read:NWERN', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});

// mini api routes
// http://localhost:5432/api/download-data?primaryKeys=17101012114127892017-09-01

// 


export default router