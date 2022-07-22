import { Pool } from "pg"

const connectionString = process.env.DBSTR
const pool = new Pool({
  connectionString,
})
const printEnv = () => {
  console.log("in pg.ts: ", connectionString)
}

export {pool, printEnv}