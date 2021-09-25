const socketio = require('socket.io')

const router = http => {
    const io = new socketio.Server(http, {
        cors: {
            origin: '*'
        }
    })

    io.on('connection', socket => {
        console.log('connected client on socket')

        socket.on('msg', data => {
            if(data.from && data.to) {
                console.log(data)
            }
        })
    })
}

module.exports = router