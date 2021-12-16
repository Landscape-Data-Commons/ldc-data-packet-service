import express from 'express'
import * as testController from '../controllers/testController'

const router = express.Router()

router.get('/pull', testController.getData)
export default router