const router = require('express').Router()

router.use('/join', require('./join'))
router.use('/user', require('./user'))
router.use('/post', require('./post'))

module.exports = router