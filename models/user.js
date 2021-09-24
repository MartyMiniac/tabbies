const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    joiningDate : {
        type: Date,
        required: true
    }
})

const user = mongoose.model('user', userSchema)
module.exports = user