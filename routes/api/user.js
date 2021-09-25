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

router.post('/search', isAuthenticated, (req, res) => {
    userOps.searchUser(req.body.query)
    .then(data => {
        return res.json(data)
    })
    .catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

router.get('/viewProfile', isAuthenticated, (req, res) => {
    res.redirect('/user/'+req.query.uid)
})

router.post('/getProfile', isAuthenticated, (req, res) => {
    userOps.getUserProfile(req.body.uid)
    .then(data => {
        if(data.success) {
            return res.json(data.data)
        }
        else {
            return res.sendStatus(404)
        }
    })
    .catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

module.exports = router