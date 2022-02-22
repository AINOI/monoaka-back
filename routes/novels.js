import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import member from '../middleware/members.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'

import {
  create,
  getNovels,
  getAllNovels,
  getNovelsById,
  updataNovelsById,
  updataNovelsPublishById,
  deleteNovels
} from '../controllers/novels.js'

const router = express.Router()

router.post('/', auth, member, content('multipart/form-data'), upload, create)
router.delete('/admin/:id', auth, admin, deleteNovels)
router.get('/all', auth, admin, getAllNovels)
router.get('/', getNovels)
router.get('/me', auth, member, getNovels)
router.get('/:id', getNovelsById)
router.patch('/admin/:id', auth, admin, updataNovelsPublishById)
router.patch('/:id', auth, member, content('multipart/form-data'), upload, updataNovelsById)
export default router
