import { Router, useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from "react"
import { io } from 'socket.io-client'
import styles from '../styles/Home.module.css'
import WordGuess from '../components/WordGuess'
let socket

const startState = {
    started: false,
    live: false,
    done: false,
    winner: -1 /*index of player in Array*/,
    players: []
}

const targetWord = "tests"

export default function Game() {
    const router = useRouter()

    const [gameState, setGameState] = useState(startState)

    useEffect(() => {
        initSocket()
        initPlayer()
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
            // if(gameState != newState)
            setGameState(newState)
        })

        socket.on('game-end', newState => {
            console.log("Game has ended")
        })

        socket.on('player-join', newPlayer => {
            console.log(newPlayer)
        })
        // initPlayer()
    }

    const initPlayer = () => {
        const playerNum = router.query.p
        const playerName = router.query.n
        const secretWord = router.query.w

        fetch('/api/join', {
            method: 'POST',
            body: JSON.stringify({
                number: playerNum,
                name: playerName,
                secretWord: secretWord
            })
        })
        console.log("init player")
        // router.replace('/game', undefined, {shallow:true})
        let players = [{}, {}]
        let letters = {}
        for (let i = 0; i < 26; i++) {
            let c = String.fromCharCode(97 + i)
            letters[c] = 'none'
        }
        let currPlayer = {
            name: playerName,
            secretWord: secretWord,
            targetWord: '',
            letters: letters,
            numGuesses: 0,
            pastGuesses: [],
            currentGuess: '',
            winner: false
        }
        players[playerNum - 1] = currPlayer
        console.log(players)
        updateGameState({ players: players })
    }

    const closeConnection = () => {
        // console.log(socket)
    }

    const updateGameState = (newState) => {
        fetch('/api/update', {
            method: 'POST',
            body: JSON.stringify({
                ...gameState,
                ...newState
            })
        })
    }

    const getCurrPlayer = () => {
        return gameState.players[playerNum - 1]
    }

    return (
        <div>
            <p>{JSON.stringify(gameState)}</p>
            <button
                onClick={() => updateGameState({ started: true })}
            >
                Start
            </button>

            <h2>Player Info</h2>
            {/* <h3>Player Num: {playerNum} </h3> */}
            {/* <h3>{gameState.players} </h3> */}
            {/* <h3>Player Name: {gameState.players[playerNum-1]}</h3> */}

            {/* <main className={styles.main}>
                <WordGuess targetWord={targetWord} />
            </main> */}

        </div>
    )
}

