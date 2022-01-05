import express from 'express'
import * as testController from '../controllers/testController'

const router = express.Router()

//  direct download link 
router.get('/files/download/:uuid', testController.getData)
//  development post route
router.post('/files', testController.createData)

// axios route
router.get('/test/:records', testController.createData2)

// download page route (returned from created db entry)
router.get('/files/:uuid', testController.showData)
export default router