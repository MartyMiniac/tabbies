const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    body: {
        type: String
    },
    link: {
        type: String
    },
    contentType: {
        type: String
    },
    views: {
        type: Number
    },
    owner: {
        type: String
    }
})

const post = mongoose.model('post', postSchema)
module.exports = post