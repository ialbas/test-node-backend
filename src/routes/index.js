const HandlerHttp = require('./handlerHttp')

module.exports = (router) => {
  // Post router
  const {
    HandlerGetByID,
    HandlerGetAll,
    HandlerRemove,
    HandlerCreate,
    HandlerUpdate,
    HandlerLogin,
    authTokenVerify
  } = new HandlerHttp()

  // Route Post With Authorization
  router.post('/api/posts', authTokenVerify, HandlerCreate)
  router.get('/api/posts', authTokenVerify, HandlerGetAll)
  router.get('/api/posts/:id', authTokenVerify, HandlerGetByID)
  router.put('/api/posts/:id', authTokenVerify, HandlerUpdate)
  router.delete('/api/posts/:id', authTokenVerify, HandlerRemove)

  // Route Auth Open
  router.post('/api/auth/login', HandlerLogin)
}
