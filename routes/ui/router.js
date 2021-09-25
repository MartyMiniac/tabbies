const router = require('express').Router()
const fs = require('fs')
const {getHTMLFile} = require('../../utilities/fileOps')
const {alreadyLogin, isAuthenticated} = require('../../auth/login')

router.get('/', isAuthenticated, (req, res) => {
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

router.get('/user/:id', isAuthenticated, (req, res) => {
    res.sendFile(getHTMLFile('userProfile.html'))
})

router.get('/explore', isAuthenticated, (req, res) => {
    res.sendFile(getHTMLFile('explore.html'))
})

router.get('/explore/:interest', isAuthenticated, (req, res) => {
    res.sendFile(getHTMLFile('exploreHobby.html'))
})

module.exports = router