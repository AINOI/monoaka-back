import reports from '../models/reports.js'

// create reports
export const createReport = async (req, res) => {
  try {
    const result = await reports.create({ ...req.body })
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

// get all reports
export const getAllReports = async (req, res) => {
  try {
    const result = await reports.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

// update reports state by ID
export const reportProcessed = async (req, res) => {
  const data = {
    processed: req.body.processed
  }

  try {
    const result = await reports.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
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

export const deleteReport = async (req, res) => {
  try {
    await reports.findByIdAndDelete(req.params.id, { new: true, runValidators: true })
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'CastError') {
      req.status(404).send({ success: false, message: '找不到文作' })
    } else {
      res.status(500).send({ sucess: false, message: '伺服器錯誤' })
    }
  }
}
