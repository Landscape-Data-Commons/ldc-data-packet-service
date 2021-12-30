import express from 'express'
import * as testController from '../controllers/testController'

const router = express.Router()

router.get('/:uuid', testController.getData)
router.post('/files', testController.createData)
router.get('/files/:uuid', testController.showData)
export default router