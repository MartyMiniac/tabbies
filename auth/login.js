const jwt = require('jsonwebtoken')

exports.createToken = username => {
    return jwt.sign(username, process.env.JWT_SECERT)
}

exports.alreadyLogin = (req, res, next) => {
    try {
        const username = jwt.verify(req.cookies.jwtToken, process.env.JWT_SECERT)
        console.log(username)
        return res.redirect('/')
    }
    catch {
        next()
    }
}