export default function handleJoin(req, res) {
    // console.log(req.body)
    // console.log(res.socket.server.io)
    res.socket.server.io.emit('player-join', JSON.parse(req.body))
    res.status(200).send()
}