import {
  auth,
  requiredScopes,
  claimEquals,
  claimIncludes,
  claimCheck
} from 'express-oauth2-jwt-bearer';
import secrets from '../db/secrets'

let domain = secrets.read('node_auth0domain')||process.env.AUTH0_DOMAIN
export const authCheck = auth({
  issuerBaseURL: `https://${domain}`,
  // jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  audience: secrets.read('node_auth0audience')||process.env.AUTH0_AUDIENCE
})