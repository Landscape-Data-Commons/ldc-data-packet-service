import express from 'express'
import * as testController from '../controllers/testController'

const router = express.Router()

router.get('/test', testController.getData)
export default router