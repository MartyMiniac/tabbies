const saltedMd5 = require('salted-md5')
const admin = require("firebase-admin");
const path = require('path')
const multer = require('multer')
require('dotenv').config()

const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL
});

const bucket = admin.storage().bucket()

exports.upload = multer({
  storage: multer.memoryStorage()
})

exports.uploadFile = file => {
    const name = saltedMd5(file.originalname, process.env.MD5_SALT)
    const filename = name+path.extname(file.originalname)
    bucket.file(filename).createWriteStream().end(file.buffer)
    let f= bucket.file(filename)
    return f.getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    })
}