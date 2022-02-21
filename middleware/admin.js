export default (req, res, next) => {
  if (req.user.role !== 1) {
    console.log(123)
    res.status(403).send({ success: false, message: '沒有權限' })
  } else {
    next()
  }
}
