export default function handleStart(req, res) {
    console.log("START GAME ROUTE")
    // console.log(res.socket.server.io)
    res.socket.server.io.emit('game-started', '')
    res.status(200).send()
}