import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'
import admin from '../middleware/admin.js'

import {
  uploadCarouselImg,
  getCarouselImg,
  deleteCarouselImg
} from '../controllers/pages.js'

const router = express.Router()

// new
router.post('/', auth, admin, content('multipart/form-data'), upload, uploadCarouselImg)
// get
router.get('/', getCarouselImg)
// delete
router.delete('/:id', auth, admin, deleteCarouselImg)

export default router
