import { Pool } from "pg"

const unrestricted = process.env.DBSTR

const ndowConn = process.env.NDOW 
const rhemConn = process.env.RHEM
const nwernConn = process.env.NWERN

const ndowrhemConn = process.env.NDOWRHEM
const ndownwernConn = process.env.NDOWNWERN
const rhemnwernConn = process.env.RHEMNWERN

const ndowrhemnwernConn = process.env.NDOWRHEMNWERN 

const pool = new Pool({
  unrestricted,
})

const pool2 = new Pool({
  ndowConn,
})

const pool3 = new Pool({
  rhemConn,
})

const pool4 = new Pool({
  nwernConn,
})

const pool5 = new Pool({
  ndowrhemConn,
})

const pool6 = new Pool({
  ndownwernConn,
})

const pool7 = new Pool({
  rhemnwernConn,
})

const pool8 = new Pool({
  ndowrhemnwernConn,
})



export {
        pool,
        pool2,
        pool3,
        pool4,
        pool5,
        pool6,
        pool7,
        pool8
      }