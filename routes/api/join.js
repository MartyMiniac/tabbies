const router = require('express').Router()
const joinOps = require('../../controllers/join')

router.post('/checkUsernameAvailable', (req, res) => {
    joinOps.usernameAvailable(req.body.username)
    .then(data => {
        if(data) {
            return res.json({
                success: true
            })
        }
        return res.json({
            success: false
        })
    })
    .catch(err => {
        console.log(err)
        res.json({
            success: false
        })
    })
})
router.post('/signup', (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.username) {
        return res.send(400).json({
            success: false,
            message: 'PARAMETER ERROR : required name, email, password and username'
        })
    }
    joinOps.signup(req.body)
    .then(() => {
        res.redirect('/login')
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'internal error occured'
        })
    })
})
router.post('/login', (req, res) => {
    console.log(req.body)
    joinOps.login(req.body)
    .then(data => {
        if(!data.success) {
            return res.redirect('/loginFail')
        }
        return res.cookie('jwtToken', data.cookie).redirect('/')
    })
    .catch(err => {
        console.log(err)
        return res.redirect('/loginFail')
    })
})
module.exports = router