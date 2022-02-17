import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'
import admin from '../middleware/admin.js'

import {
  register,
  login,
  logout,
  extend,
  getUserInfo,
  updataInfo,
  getAll,
  getUserById
} from '../controllers/users.js'

const router = express.Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), login)
router.delete('/logout', auth, logout)
router.post('/logout', auth, extend)
router.get('/me', auth, getUserInfo)
router.get('/getall', auth, admin, getAll)
router.get('/:id', getUserById)
router.patch('/reinfo', auth, upload, updataInfo)

export default router
