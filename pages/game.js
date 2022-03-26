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
    const [currPlayer, setCurrPlayer] = useState(null)
    const [otherPlayer, setOtherPlayer] = useState(null)

    useEffect(() => {
        initSocket().then(() => {
            initPlayer()
        })
        return closeConnection()
    }, [])

    useEffect(() => {
        console.log(currPlayer)
    }, [currPlayer])

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

        socket.on('player-update', player => {
            // console.log("")
            if(player.number !== currPlayer.number)
                setOtherPlayer(player)
        })

        socket.on('game-end', newState => {
            console.log("Game has ended")
        })

        socket.on('player-join', newPlayer => {
            console.log("NEW PLAYER: " + JSON.stringify(newPlayer))
            console.log("CURR PLAYER: " + JSON.stringify(currPlayer))
            if(currPlayer !== null && newPlayer.number !== currPlayer.number){
                setOtherPlayer(newPlayer)
                fetch('/api/join', {
                    method: 'POST',
                    body: JSON.stringify(currPlayer)
                })
            }
        })
        // initPlayer()
    }

    const initPlayer = () => {
        console.log("QUERY " + JSON.stringify(router.query))

        const playerNum = router.query.p
        const playerName = router.query.n
        const secretWord = router.query.w
        console.log("init player")
        // router.replace('/game', undefined, {shallow:true})
        let letters = {}
        for (let i = 0; i < 26; i++) {
            let c = String.fromCharCode(97 + i)
            letters[c] = 'none'
        }
        let currPlayer = {
            number: playerNum,
            name: playerName,
            secretWord: secretWord,
            targetWord: '',
            letters: letters,
            numGuesses: 0,
            pastGuesses: [],
            currentGuess: '',
            winner: false
        }
        setCurrPlayer(currPlayer)
        fetch('/api/join', {
            method: 'POST',
            body: JSON.stringify(currPlayer)
        })
    }

    const closeConnection = () => {
        // console.log(socket)
        socket?.close()
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

    return (
        <div>
            <p>{JSON.stringify(gameState)}</p>
            <p>{JSON.stringify(currPlayer)}</p>
            <p>{JSON.stringify(otherPlayer)}</p>
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

