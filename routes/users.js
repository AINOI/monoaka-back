import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js'
import admin from '../middleware/admin.js'
import member from '../middleware/members.js'

import {
  register,
  login,
  logout,
  extend,
  getUserInfo,
  updataInfo,
  getAll,
  getUserById,
  accountState,
  deleteAccount,
  themeSwitch
} from '../controllers/users.js'

const router = express.Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), login)
router.patch('/themeswitch', auth, themeSwitch)
router.delete('/logout', auth, logout)
router.delete('/deleteaccount/:id', auth, admin, deleteAccount)
router.post('/logout', auth, extend)
router.get('/me', auth, getUserInfo)
router.get('/nauthorgetall', getAll)
router.get('/getall', auth, admin, getAll)
router.get('/:id', getUserById)
router.patch('/accountstate/:id', auth, admin, accountState)
router.patch('/reinfo', auth, member, content('multipart/form-data'), upload, updataInfo)

export default router
