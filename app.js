const express = require('express')
const app = express()
const http = require('http').Server(app)

app.use((req, res, next) => {
    console.log('BEEP BOOP at', new Date())
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(require('./utilities/cookieParser'))
app.use('/static', express.static('static'))

app.use('/api', require('./routes/api/router'))
app.use('/', require('./routes/ui/router'))
require('./routes/websockets/socketRoutes')(http)

module.exports = http