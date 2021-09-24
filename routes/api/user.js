const router = require('express').Router()
const { isAuthenticated } = require('../../auth/login')
const userOps = require('../../controllers/user')

router.get('/getUserInfo', isAuthenticated, (req, res) => {
    userOps.getUserInfo(req.id)
    .then(data => {
        if(!data.success) {
            return res.status(404).json(data)
        }

        return res.json(data)
    })
})

router.get('/signOut', isAuthenticated, (req, res) => {
    res.clearCookie('jwtToken').redirect('/login')
})

module.exports = router