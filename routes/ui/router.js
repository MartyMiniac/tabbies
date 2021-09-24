const router = require('express').Router()
const fs = require('fs')
const {getHTMLFile} = require('../../utilities/fileOps')
const {alreadyLogin} = require('../../auth/login')

router.get('/', (req, res) => {
    res.sendFile(getHTMLFile('index.html'))
})

router.get('/login', alreadyLogin, (req, res) => {
    res.sendFile(getHTMLFile('login.html'))
})

router.get('/loginFail', alreadyLogin, (req, res) => {
    res.sendFile(getHTMLFile('login-failed.html'))
})

router.get('/signup', alreadyLogin, (req, res) => {
    res.sendFile(getHTMLFile('signup.html'))
})

module.exports = router