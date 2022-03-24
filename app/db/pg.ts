require('dotenv').config();
import { Pool } from "pg"

const connectionString = process.env.DBSTR
const pool = new Pool({
  connectionString,
})


export {pool}