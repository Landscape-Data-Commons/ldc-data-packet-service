const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');
require('dotenv').config();
const jwtok = require('jsonwebtoken')

class MissingScopeError extends Error {
  constructor () {
    super()
    this.code = 'ERR_MISSING_SCOPE'
  }
  get name () {
    return `MissingScopeError [${this.code}]`
  }
}

const requiredScopes = {
  nri:          ['read:NRI'],
  nwern:        ['read:NWERN'],
  rhem:         ['read:RHEM'],
  nriNwern:     ['read:NRI', 'read:NWERN'],
  nriRhem:      ['read:NRI', 'read:RHEM'],
  nwernRhem:    ['read:NWERN', 'read:RHEM'],
  nriNwernRhem: ['read:NRI', 'read:NWERN', 'read:RHEM']
}

function checkScopes(tokenDecoded, requiredScopes) {

  if (tokenDecoded.scope.split(' ').sort() !== requiredScopes.sort()) {
    throw new MissingScopeError()
  }
}

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

// 2022-07-29-CMF: NOTE THAT { checkAllScopes: true } *DOES NOT CHECK ALL SCOPES; LEFT IN ANYWAY; REMOVE IF DESIRED
app.put('/unrestricted', function (req, res) {
  const primaryKeys = req.body;
  const userId = req.user['http://localhost:3002/email'];

  // CMF: Add query-processing and email processing

  res.status(200).send();
});

// 2022-07-29-CMF: NOTE THAT { checkAllScopes: true } *DOES NOT CHECK ALL SCOPES; LEFT IN ANYWAY; REMOVE IF DESIRED
app.put('/nri', 
        checkJwt, 
        jwtAuthz(['read:NRI'], { checkAllScopes: true }), 
        function (req, res) {
          try {
            const tokenDecoded = jwtok.decode(req.headers.authorization.split(' ')[1])
            checkScopes(tokenDecoded, requiredScopes.nri)
            const primaryKeys = req.body;
            const userId = req.user['http://localhost:3002/email'];
        
            // CMF: Add query/email/download processing
        
          }
          catch (err) {
            console.log(err.toString())
            res.status(403).send();
          }

          res.status(200).send();
});

// 2022-07-29-CMF: NOTE THAT { checkAllScopes: true } *DOES NOT CHECK ALL SCOPES; LEFT IN ANYWAY; REMOVE IF DESIRED
app.put('/nwern', 
        checkJwt, 
        jwtAuthz(['read:NWERN'], { checkAllScopes: true, failWithError: true }), 
        function (req, res) {
          try {
            const tokenDecoded = jwtok.decode(req.headers.authorization.split(' ')[1])
            checkScopes(tokenDecoded, requiredScopes.nwern)
            const primaryKeys = req.body;
            const userId = req.user['http://localhost:3002/email'];
        
            // CMF: Add query/email/download processing
        
          }
          catch (err) {
            console.log(err.toString())
            res.status(403).send();
          } 
          
          res.status(200).send();
});

// 2022-07-29-CMF: NOTE THAT { checkAllScopes: true } *DOES NOT CHECK ALL SCOPES; LEFT IN ANYWAY; REMOVE IF DESIRED
app.put('/rhem', 
        checkJwt, 
        jwtAuthz(['read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
          try {
            const tokenDecoded = jwtok.decode(req.headers.authorization.split(' ')[1])
            checkScopes(tokenDecoded, requiredScopes.rhem)
            const primaryKeys = req.body;
            const userId = req.user['http://localhost:3002/email'];
        
            // CMF: Add query/email/download processing
        
          }
          catch (err) {
            console.log(err.toString())
            res.status(403).send();
          } 
          res.status(200).send();
});

// 2022-07-29-CMF: NOTE THAT { checkAllScopes: true } *DOES NOT CHECK ALL SCOPES; LEFT IN ANYWAY; REMOVE IF DESIRED
app.put('/nri-nwern', checkJwt, 
        jwtAuthz(['read:NRI', 'read:NWERN'], { checkAllScopes: true }), 
        function (req, res) {
          try {
            const tokenDecoded = jwtok.decode(req.headers.authorization.split(' ')[1])
            checkScopes(tokenDecoded, requiredScopes.nriNwern)
            const primaryKeys = req.body;
            const userId = req.user['http://localhost:3002/email'];
        
            // CMF: Add query/email/download processing
        
          }
          catch (err) {
            console.log(err.toString())
            res.status(403).send();
          }   

          res.status(200).send();
});
 
// 2022-07-29-CMF: NOTE THAT { checkAllScopes: true } *DOES NOT CHECK ALL SCOPES; LEFT IN ANYWAY; REMOVE IF DESIRED
app.put('/nri-rhem', checkJwt, 
        jwtAuthz(['read:NRI', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
          try {
            const tokenDecoded = jwtok.decode(req.headers.authorization.split(' ')[1])
            checkScopes(tokenDecoded, requiredScopes.nriRhem)
            const primaryKeys = req.body;
            const userId = req.user['http://localhost:3002/email'];
        
            // CMF: Add query/email/download processing
        
          }
          catch (err) {
            console.log(err.toString())
            res.status(403).send();
          } 

          res.status(200).send();
});

// 2022-07-29-CMF: NOTE THAT { checkAllScopes: true } *DOES NOT CHECK ALL SCOPES; LEFT IN ANYWAY; REMOVE IF DESIRED
app.put('/nwern-rhem', checkJwt, 
        jwtAuthz(['read:NWERN', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
          try {
            const tokenDecoded = jwtok.decode(req.headers.authorization.split(' ')[1])
            checkScopes(tokenDecoded, requiredScopes.nwernRhem)
            const primaryKeys = req.body;
            const userId = req.user['http://localhost:3002/email'];
        
            // CMF: Add query/email/download processing
        
          }
          catch (err) {
            console.log(err.toString())
            res.status(403).send();
          }       

          res.status(200).send();
});

// 2022-07-29-CMF: NOTE THAT { checkAllScopes: true } *DOES NOT CHECK ALL SCOPES; LEFT IN ANYWAY; REMOVE IF DESIRED
app.put('/nri-nwern-rhem', 
        checkJwt, 
        jwtAuthz(['read:NRI', 'read:NWERN', 'read:RHEM'], { checkAllScopes: true }), 
        function (req, res) {
          try {
            const tokenDecoded = jwtok.decode(req.headers.authorization.split(' ')[1])
            checkScopes(tokenDecoded, requiredScopes.nriNwernRhem)
            const primaryKeys = req.body;
            const userId = req.user['http://localhost:3002/email'];

            // CMF: Add query/email/download processing

          }
          catch (err) {
            console.log(err.toString())
            res.status(403).send();
          }

          res.status(200).send();
});

// launch the API Server at localhost:8090

app.listen(8090);
console.log('Listening on http://localhost:8090');
