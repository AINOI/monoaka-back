import mongoose from 'mongoose'

const reportSchema = new mongoose.Schema({
  rpaccount: {
    type: String
  },
  rpnickname: {
    type: String
  },
  rpemail: {
    type: String
  },
  reportItem: {
    type: String,
    enum: {
      values: ['帳號相關', '活動相關', '創作相關', '文作瀏覽相關', '文作標題不合適', '其他問題'],
      message: '相關事宜不存在'
    }
  },
  reportText: {
    type: String
  },
  processed: {
    type: Boolean,
    default: false
  }
}, { versionKey: false })

export default mongoose.model('reports', reportSchema)
