const user = require('../models/user')

exports.getUserInfo = (uid) => {
    return new Promise((resolve, refuse) => {
        user.findById(uid)
        .then(usr => {
            if(usr==null) {
                resolve({
                    success: false
                })
            }
            resolve({
                success: true,
                data: {
                    name: usr.name
                }
            })
        })
        .catch(err => {
            refuse(err)
        })
    })
}