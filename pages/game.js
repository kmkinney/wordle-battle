import { Router } from "next/router"
import { useEffect } from "react"
import { useState } from "react"
import { io } from 'socket.io-client'
let socket

const startState = {
    started: false,
    live: false,
    done: false,
    winner: -1 /*index of player in Array*/,
    players: []
}

export default function Game() {
    const [gameState, setGameState] = useState(startState)
    const [playerName, setPlayerName] = useState('')
    const [secretWord, setSecretWord] = useState('')

    useEffect(() => {
        initSocket()
        return closeConnection()
    }, [])

    const initSocket = async () => {
        await fetch('/api/socket')
        socket = io()
        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('update-game-state', newState => {
            console.log("Game State Updated")
            console.log(newState)
            // processUpdate(newState)
            setGameState(newState)
        })

        socket.on('game-end', newState => {
            console.log("Game has ended")
        })
    }

    const closeConnection = () => {
        console.log(socket)
    } 

    const updateGameState = (newState) => {
        socket.emit('game-update', newState)
        setGameState(gameState => {
            return {
                ...gameState,
                ...newState
            }
        })
    }

    const addPlayer = () => {
        let currPlayers = gameState.players
        console.log("NUM PLAYERS " + currPlayers.length)
        console.log(currPlayers)
        currPlayers.push({
            name: playerName,
            secretWord: secretWord,
            targetWord: '',
            letters: Array.from('none'.repeat(26)),
            numGuesses: 0,
            pastGuesses: [],
            currentGuess: '', 
            winner: false
        })
        updateGameState({players: currPlayers})
    }

    return (
        <div>
            <p>{JSON.stringify(gameState)}</p>
            <p>Started: {''+gameState.started}</p>
            <p>Live: {''+gameState.live}</p>
            <p>Done: {''+gameState.done}</p>
            <p>PlayerCount: {gameState.players.length}</p>
            <button
                onClick={() => updateGameState({started: true})}
            >
                Start
            </button>
            <button onClick={(e) => {
                e.preventDefault()
                console.log(socket)
                // socket.disconnect()
                socket.emit("game-update", gameState)
            }}>Update</button>

            <h2>Player Info</h2>
            <input
                placeholder="Enter your name"
                value={playerName}
                onChange={(e)=>setPlayerName(e.target.value)}
            />
            <input
                placeholder="Enter your Secret Word"
                value={secretWord}
                onChange={(e)=>setSecretWord(e.target.value)}
            />
            <button onClick={() => {addPlayer()}}>
                Add Player
            </button>
        </div>
    )
}

