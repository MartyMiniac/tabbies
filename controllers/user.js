const user = require('../models/user')
const post = require('../models/post')

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
                    name: usr.name,
                    username: usr._id
                }
            })
        })
        .catch(err => {
            refuse(err)
        })
    })
}

exports.searchUser = (text) => {
    return new Promise((resolve, refuse) => {
        user.find({
            _id: {
                $regex: text
            }
        }).select('_id')
        .then(arr => {
            let res=[]
            res=arr.map(element => {
                return element._id
            })
            resolve(res)
        })
        .catch(err => {
            refuse(err)
        })
    })
}

exports.getUserProfile = (uid) => {
    return new Promise((resolve, refuse) => {
        user.findById(uid).select(['_id', 'name', 'email', 'posts', 'interest'])
        .then(usr => {
            if(usr==null) {
                resolve({
                    success: false
                })
            }            
            resolve({
                success: true,
                data: usr
            })
        })
        .catch(err => {
            refuse(err)
        })
    })
}