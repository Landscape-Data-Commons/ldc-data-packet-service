import {
  auth,
  requiredScopes,
  claimEquals,
  claimIncludes,
  claimCheck
} from 'express-oauth2-jwt-bearer';
import secrets from '../db/secrets'
import { Request, NextFunction } from 'express';
import { CognitoJwtVerifier } from 'aws-jwt-verify';


export const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: 'us-west-1_FgaW15JOh',
  tokenUse: 'id',
  clientId: '3ocfhcl3smtnnu6m0qkne8v8tg',
});

export const authCheck = async ( req, res, next) => {
  let token = extractTokenFromHeader(req)
  console.log(req.header("authorization"))
  try{
    if(token!==undefined){
      await jwtVerifier.verify(token)
      next()
    }
    
  } catch (err) {
    console.error(err)
    return res.status(403).json({ statusCode: 403, message: "Forbidden" })
  }
  
}

export const extractTokenFromHeader = (request: Request): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}



// export const authCheck = auth({
//   issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
//   // jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
//   audience: process.env.AUTH0_AUDIENCE
// })