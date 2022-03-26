export default function handleUpdate(req, res) {
    console.log("P1 UPDATE")
    console.log(req.body)
    // console.log(res.socket.server.io)
    res.socket.server.io.emit('player-1-update', JSON.parse(req.body))
    res.status(200).send()
}