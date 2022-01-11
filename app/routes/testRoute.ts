import express from 'express'
import * as testController from '../controllers/testController'
import { verifyJwt } from "../auth.middleware";

const router = express.Router()

//  direct download link 
router.get('/files/download/:uuid', testController.getData)
//  development post route
router.post('/files', testController.createData)



// download page route (returned from created db entry)
router.get('/files/:uuid', testController.showData)

router.use(verifyJwt)
// axios route
router.get('/test/:records', testController.createData2)
export default router