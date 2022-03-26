import { useEffect } from "react"
import { useState } from "react"
import { io } from 'socket.io-client'
let socket

export default function SocketTest() {
    const [input, setInput] = useState('')

    const [gameState, setGameState] = useState({
        started: false,
        playerOne: {
            name: '',
            word: '',
            numGueses: '',
            score: 0
        },
        playerTwo: {
            name: '',
            word: '',
            numGueses: '',
            score: 0
        }
    })

    useEffect(() => {
        getSocket()
        return () => {
            // if(socket !== null)
                // socket.close()
        }
    }, [])

    const getSocket = async () => {
        await fetch('/api/game-socket')
        socket = io()

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('update-input', msg => {
            console.log(msg)
            setInput(msg)
        })
    }

    const onChangeHandler = (e) => {
        // console.log(e)
        setInput(e.target.value)
        socket.emit('input-change', e.target.value)
    }

    return (
        <div>
            <h1>Test</h1>
            <input
                placeholder="Type something"
                value={input}
                onChange={onChangeHandler}
            />
        </div>
    )
}