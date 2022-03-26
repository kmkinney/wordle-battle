export default function handleUpdate(req, res) {
    console.log("UPDATE")
    console.log(req.path)
    // console.log(res.socket.server.io)
    res.socket.server.io.emit('update-game-state', JSON.parse(req.body))
    res.status(200).send()
}