const user = require('../models/user')
const firestoreOps = require('./firestoreOps')
const {createToken} = require('../auth/login')

exports.signup = data => {
    return new Promise((resolve, refuse) => {
        const u = new user({
            name: data.name.toLowerCase(),
            _id: data.username.toLowerCase(),
            email: data.email.toLowerCase(),
            password: data.password,
            joiningDate: new Date()
        })
        u.save()
        .then(() => {
            resolve()
        })
        .catch(err => {
            refuse(err)
        })
    })
}

exports.usernameAvailable = username => {
    return new Promise((resolve, refuse) => {
        user.findById(username)
        .then(data => {
            if(data===null) {
                resolve(true)
            }
            resolve(false)
        })
        .catch(err => {
            refuse(err)
        })
    })
}

exports.login = data => {
    return new Promise((resolve, refuse) => {
        user.findById(data.username)
        .then(usr => {
            if(usr==null) {
                resolve({
                    success: false
                })
            }
            else {
                if(data.password==usr.password) {
                    resolve({
                        success: true,
                        cookie: createToken(data.username)
                    })
                }
                else {
                    resolve({
                        success: false
                    })
                }
            }
        })
        .catch(err => {
            refuse(err)
        })
    })
}