import novels from '../models/novels.js'

// write a novels
export const create = async (req, res) => {
  try {
    const result = await novels.create({ ...req.body, image: req.file.path })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// if publish
export const getNovels = async (req, res) => {
  try {
    const result = await novels.find({ publish: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// all
export const getAllNovels = async (req, res) => {
  try {
    const result = await novels.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// get novel by ID
export const getNovelsById = async (req, res) => {
  try {
    const result = await novels.findById(req.params.id)
    if (result) {
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(404).send({ success: false, message: '找不到' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// update novel by ID
export const updataNovelsById = async (req, res) => {
  const data = {
    title: req.body.title,
    summary: req.body.summary,
    novelType: req.body.novelType,
    text: req.body.text
  }

  if (req.file) {
    data.image = req.file.path
  }
  try {
    const result = await novels.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// update publish state by ID
export const updataNovelsPublishById = async (req, res) => {
  const data = {
    publish: req.body.publish
  }

  try {
    const result = await novels.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

// delete novel
export const deleteNovels = async (req, res) => {
  try {
    await novels.findByIdAndDelete(req.params.id, { new: true, runValidators: true })
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'CastError') {
      req.status(404).send({ success: false, message: '找不到文作' })
    } else {
      res.status(500).send({ sucess: false, message: '伺服器錯誤' })
    }
  }
}
