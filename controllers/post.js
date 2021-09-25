const firebaseOps = require('./firestoreOps')
const user = require('../models/user')
const post = require('../models/post')

exports.createPost = (file, data, uid) => {
    return new Promise((resolve, refuse) => {
       firebaseOps.uploadFile(file)
       .then(signedUrls => {
           const p = new post({
               body: data.body,
               link: signedUrls[0],
               contentType: data.contentType,
               views: 0,
               owner: uid
           })

           p.save()
           .then(pst => {
               user.findByIdAndUpdate(uid, {
                   $push: {
                       posts: pst._id
                   }
               })
               .then(() => {
                   resolve()
               })
               .catch(err => {
                   console.log(err)
                   refuse(err)
               })
           })
           .catch(err => {
               console.log(err)
               refuse(err)
           })
       })
    })
}

exports.getPosts = () => {
    return new Promise((resolve, refuse) => {
        post.find().sort({views: 1}).limit(5).exec()
        .then(psts => {
            psts.forEach(p => {
                p.views = p.views+1
                p.save()
            })
            resolve(psts)
        })
        .catch(err => {
            refuse(err)
        })
    })
}

exports.getPostsFromArray = arr => {
    return new Promise((resolve, refuse) => {
        post.find({
            _id: {
                $in: arr
            }
        })
        .then(data => {
            resolve(data)
        })
        .catch(err => {
            refuse(err)
        })
    })
}