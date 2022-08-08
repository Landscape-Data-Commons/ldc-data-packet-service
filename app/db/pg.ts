require('dotenv').config();
import { Pool } from "pg"
import secrets from './secrets'

let loginObj = {
  host: secrets.read('node_dbhost')||process.env.DBHOST,
  port:secrets.read('node_dbport')||process.env.DBPORT,
  database:secrets.read('node_db')||process.env.DB,
}
const ul = 'user'
const up = 'password'
function poolSelector(request:any){
  const permissions = request.auth.payload.permissions
  if(
    !permissions.includes('read:NDOW') &&
    !permissions.includes('read:RHEM') &&
    !permissions.includes('read:NWERN')
  ){
    loginObj[ul]=secrets.read('node_restricted')||process.env.RESTRICTED
    loginObj[up]=secrets.read('node_restrictedp')||process.env.RESTRICTEDP
    return new Pool(loginObj)
  }else if(
    permissions.includes('read:NDOW') &&
    !permissions.includes('read:RHEM') &&
    !permissions.includes('read:NWERN')
  ){
    console.log("ndow")
    loginObj[ul]=secrets.read('node_ndow')||process.env.NDOW
    loginObj[up]=secrets.read('node_ndowp')||process.env.NDOWP
    return new Pool(loginObj)
  }else if(
    !permissions.includes('read:NDOW') &&
    permissions.includes('read:RHEM') &&
    !permissions.includes('read:NWERN')
  ){
    console.log("rhem")
    loginObj[ul]=secrets.read('node_rhem')||process.env.RHEM
    loginObj[up]=secrets.read('node_rhemp')||process.env.RHEMP
    return new Pool(loginObj)
  }else if(
    !permissions.includes('read:NDOW') &&
    !permissions.includes('read:RHEM') &&
    permissions.includes('read:NWERN')
  ){
    loginObj[ul]=secrets.read('node_nwern')||process.env.NWERN
    loginObj[up]=secrets.read('node_nwernp')||process.env.NWERNP
    return new Pool(loginObj)
  } else if(
    permissions.includes('read:NDOW') &&
    permissions.includes('read:RHEM') &&
    !permissions.includes('read:NWERN')
  ){
    loginObj[ul]=secrets.read('node_ndowrhem')||process.env.NDOWRHEM
    loginObj[up]=secrets.read('node_ndowrhemp')||process.env.NDOWRHEMP
    return new Pool(loginObj)
  }else if(
    permissions.includes('read:NDOW') &&
    !permissions.includes('read:RHEM') &&
    permissions.includes('read:NWERN')
  ){
    loginObj[ul]=secrets.read('node_ndownwern')||process.env.NDOWNWERN
    loginObj[up]=secrets.read('node_ndownwernp')||process.env.NDOWNWERNP
    return new Pool(loginObj)
  } else if(
    !permissions.includes('read:NDOW') &&
    permissions.includes('read:RHEM') &&
    permissions.includes('read:NWERN')
  ){
    loginObj[ul]=secrets.read('node_nwernrhem')||process.env.RHEMNWERN
    loginObj[up]=secrets.read('node_nwernrhemp')||process.env.RHEMNWERNP
    return new Pool(loginObj)
  } else if(
    permissions.includes('read:NDOW') &&
    permissions.includes('read:RHEM') &&
    permissions.includes('read:NWERN')
  ){
    loginObj[ul]=secrets.read('node_ndownwernrhem')||process.env.NDOWRHEMNWERN
    loginObj[up]=secrets.read('node_ndownwernrhemp')||process.env.NDOWRHEMNWERNP
    return new Pool(loginObj)
  }
}

  

export {
        poolSelector
      }