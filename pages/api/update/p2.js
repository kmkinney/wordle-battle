export default function handleUpdate(req, res) {
    console.log("P2 UPDATE")
    console.log(req.body)
    // console.log(res.socket.server.io)
    res.socket.server.io.emit('player-2-update', JSON.parse(req.body))
    res.status(200).send()
}