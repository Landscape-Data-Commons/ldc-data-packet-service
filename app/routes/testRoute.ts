import express from 'express'
import * as testController from '../controllers/testController'
import { verifyJwt } from "../auth.middleware";

const router = express.Router()

//  direct download link 
router.get('/files/download/:uuid', testController.getData)
//  development post route
// router.post('/files', testController.createData)



// download page route (returned from created db entry)
router.get('/files/:uuid', testController.showData)




router.use(verifyJwt)
// axios route
router.get('/test', testController.createData)

// mini api routes
// http://localhost:5432/api/download-data?primaryKeys=17101012114127892017-09-01




export default router