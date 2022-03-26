export default function handleUpdate(req, res) {
    console.log("Guess UPDATE")
    console.log(req.body)
    const data = JSON.parse(req.body)
    if (data.number && data.number == 1) {
        res.socket.server.io.emit('player-1-guess', data.guess)
        return res.status(200).send()
    }
    else if (data.number && data.number == 2) {
        res.socket.server.io.emit('player-2-guess', data.guess)
        return res.status(200).send()
    }

    // console.log(res.socket.server.io)
    res.status(404).send()
}