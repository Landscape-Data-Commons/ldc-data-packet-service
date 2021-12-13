// import { FtpServerOptions, FtpSrv } from "ftp-srv";
import { connect } from './db/database'
import express from 'express'

import testRoute from './routes/testRoute'

const app = express()

const port = 5100

app.use('/api', testRoute)
app.get('/', (req,res)=>{
  console.log("working")
  res.send(__dirname)
})
// connect()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})