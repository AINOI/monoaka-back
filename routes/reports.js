import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

import {
  createReport,
  getAllReports,
  reportProcessed,
  deleteReport
} from '../controllers/reports.js'

const router = express.Router()

router.post('/', content('application/json'), createReport)
router.delete('/reportsdelete/:id', auth, admin, deleteReport)
router.get('/all', auth, admin, getAllReports)
router.patch('/reportstate/:id', auth, admin, reportProcessed)

export default router
