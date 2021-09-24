const e = require("express")

module.exports = (req, res, next) => {
    req.cookies={}
    if(!req.headers.cookie) {
        next()
    }
    else {
        cookies = req.headers.cookie.split(';')
        for(i in cookies) {
            let c = cookies[i]
            kv=c.split('=')
            req.cookies[kv[0].trim()]=kv[1]
        }
        next()
    }
}