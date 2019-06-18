const isAdminCheck = (req, res, next) => {
  if (!req.session.userId || !req.session.isAdmin) {
    const err = new Error(`Admin permission is required!`)
    err.status = 401
    return next(err)
  }
  next()
}

const isAdminOrUser = (req, res, next) => {
  if (+req.params.id !== +req.session.userId && !req.session.isAdmin) {
    console.log('reqparamsID', req.params.id)
    console.log('SESSION', req.session.userId)
    const err = new Error(`Admin permission is required!`)
    err.status = 401
    return next(err)
  }
  next()
}

module.exports = {isAdminCheck, isAdminOrUser}
