const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next()
  }
  const err = new Error(`Admin permission is required!`)
  err.status = 401
  return next(err)
}

module.exports = {isAdmin}
