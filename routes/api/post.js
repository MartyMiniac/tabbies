const router = require('express').Router()
const { isAuthenticated } = require('../../auth/login')
const postOps = require('../../controllers/post')
const { upload } = require('../../controllers/firestoreOps')

router.post('/createPost', isAuthenticated, upload.single('file'), (req, res) => {
    postOps.createPost(req.file, req.body, req.id)
    .then(() => {
        return res.redirect('/')
    })
    .catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

router.get('/getPosts', isAuthenticated, (req, res) => {
    postOps.getPosts()
    .then(arr => {
        res.json(arr)
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

router.post('/getPosts', isAuthenticated, (req, res) => {
    postOps.getPostsFromArray(req.body.posts)
    .then(data => {
        return res.json(data)
    })
    .catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

router.post('/getPostByInterest', isAuthenticated, (req, res) => {
    postOps.getPostByHobby(req.body.interest)
    .then(arr => {
        return res.json(arr)
    })
    .catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

module.exports = router