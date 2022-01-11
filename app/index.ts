
require('dotenv').config();
import { connect } from './db/database'
import express from 'express'

import path from 'path'
import testRoute from './routes/testRoute'
import cors from 'cors'

const PORT = process.env.PORT || 5100;
const app = express()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.set('views', path.join(__dirname,'/views'))
app.set('view engine', 'ejs')

connect()
app.use('/api', testRoute)
app.get('/', (req,res)=>{
  console.log("working")
  res.send(__dirname)
})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})