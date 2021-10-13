import { FtpServerOptions, FtpSrv } from "ftp-srv";
import express from 'express'

import testRoute from './routes/testRoute'

const app = express()

const port = 5100

app.use('/', testRoute)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})