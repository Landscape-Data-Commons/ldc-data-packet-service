const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');
require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

// Enable CORS
app.use(cors());

// Create middleware for checking the JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid (key id) in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
    cache: false,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.put('/unrestricted', function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];

  // CMF: Add query-processing and email processing

  res.status(200).send();
});

app.put('/nri', 
        checkJwt, 
        jwtAuthz(['read:NRI'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];

  // CMF: Add query-processing and email processing

  res.status(200).send();
});

app.put('/nwern', 
        checkJwt, 
        jwtAuthz(['read:NWERN'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];

  // CMF: Add query-processing and email processing

  res.status(200).send();
});

app.put('/rhem', 
        checkJwt, 
        jwtAuthz(['read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];
        
  // CMF: Add query-processing and email processing
        
  res.status(200).send();
});

app.put('/nri-nwern', checkJwt, 
        jwtAuthz(['read:NRI', 'read:NWERN'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});
 
app.put('/nri-rhem', checkJwt, 
        jwtAuthz(['read:NRI', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});

app.put('/nwern-rhem', checkJwt, 
        jwtAuthz(['read:NWERN', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});

app.put('/nri-nwern-rhem', 
        checkJwt, 
        jwtAuthz(['read:NRI', 'read:NWERN', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];
                
  // CMF: Add query-processing and email processing
                
  res.status(200).send();
});

// launch the API Server at localhost:8090

app.listen(8090);
console.log('Listening on http://localhost:8090');
