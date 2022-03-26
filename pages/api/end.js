export default function handleStart(req, res) {
    console.log("END GAME ROUTE")
    // console.log(res.socket.server.io)
    let winner = JSON.parse(req.body).winner
    res.socket.server.io.emit('game-ended', winner)
    res.status(200).send()
}