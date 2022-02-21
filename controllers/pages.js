import pages from '../models/pages.js'

// new one
export const uploadCarouselImg = async (req, res) => {
  try {
    console.log(req.body)
    const result = await pages.create({ carouselImage: req.file.path })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      // data error
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ sucess: false, message: error.errors[key].name })
    } else {
      // others error
      res.status(500).send({ sucess: false, message: '伺服器錯誤' })
    }
  }
}

// get
export const getCarouselImg = async (req, res) => {
  try {
    const result = await pages.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ sucess: false, message: error.errors[key].name })
    } else {
      res.status(500).send({ sucess: false, message: '伺服器錯誤' })
    }
  }
}

// delete
export const deleteCarouselImg = async (req, res) => {
  try {
    await pages.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'CastError') {
      req.status(404).send({ success: false, message: '找不到圖片' })
    } else {
      res.status(500).send({ sucess: false, message: '伺服器錯誤' })
    }
  }
}
