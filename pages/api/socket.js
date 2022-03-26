import { Server } from "socket.io";

const SocketHandler = function (req, res) {
    // console.log(req)
    if (res.socket.server.io) {
        console.log("Socket already running")
    } else {
        console.log("Socket is initializing")
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            console.log("Setting up")

            // Initialize Event Listeners
            socket.on('game-update', newState => {
                console.log('Game state was updated')
                console.log(socket)
                socket.broadcast.emit('update-game-state', newState)
            })

            socket.on('game-start', msg => {
                console.log('input change')
                socket.broadcast.emit('update-input', msg)
            })
        })
    }
    res.end()
}

export default SocketHandler