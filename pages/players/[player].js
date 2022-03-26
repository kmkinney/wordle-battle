import { Router, useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import { io } from 'socket.io-client';
import styles from '../../styles/Home.module.css';
import Game from '../../components/Game'
import OpponentView from '../../components/OpponentView';
let socket;

const startState = {
    started: false,
    done: false,
    winner: -1 /*index of player in Array*/,
};

export default function PlayerOne() {
    const router = useRouter();

    const [gameState, setGameState] = useState(startState);
    const [currPlayer, setCurrPlayer] = useState(null);
    const [otherPlayer, setOtherPlayer] = useState(null);
    const [sendUpdate, setSendUpdate] = useState(1)

    const [otherGuesses, updateOtherGuesses] = useState([])
    const [secretWord, updateSecretWord] = useState('-----');
    const [opponentWord, updateOpponentWord] = useState('-----');

    useEffect(() => {
        console.log("RESTART")
        console.log(router.query)
        initSocket();
        initPlayer();
        return closeConnection();
    }, []);

    useEffect(() => {
        console.log("opponent word UPDATE" + JSON.stringify(otherGuesses));
    }, [otherGuesses]);

    useEffect(() => {
        console.log(currPlayer)
        if (currPlayer) {
            let player = currPlayer.number
            fetch(`/api/update/p${player}`, {
                method: 'POST',
                body: JSON.stringify(currPlayer)
            })
        }
    }, [sendUpdate])

    const initSocket = async () => {
        let player = 0;
        if(router.query.player){
            player = parseInt(router.query.player)
            localStorage.setItem("player", player)
        }
        else {
            player = localStorage.getItem("player")
        }

        await fetch(`/api/socket`)
        socket = io();
        socket.on('connect', () => {
            console.log(`Player ${player} connected`);
        });

        socket.on('update-game-state', (newState) => {
            console.log('Game State Updated');
            console.log(newState);
            // processUpdate(newState)
            // if(gameState != newState)
            setGameState(newState);
        });

        socket.on(`player-${3-player}-update`, (other) => {
            console.log("PLAYER UPDATE " + other)
            setOtherPlayer(other);
            updateOpponentWord(other.secretWord)
        });

        socket.on(`player-${3-player}-guess`, (guess) => {
            console.log("PLAYER GUESS UPDATE " + JSON.stringify(guess))
            updateOtherGuesses((otherGuesses) => [...otherGuesses,guess])
        });

        socket.on('game-ended', (gameWinner) => {
            console.log('!!!Game has ended with winner: ' + gameWinner);
            updateGameState({ done: true, winner: gameWinner })
        });

        socket.on('game-started', (msg) => {
            console.log("GAME HAS STARTED " + msg)
            setSendUpdate((sendUpdate) => sendUpdate + 1)
        })
        // initPlayer()
    };

    const initPlayer = () => {
        console.log('QUERY ' + JSON.stringify(router.query));
        let player = 0
        if (router.query.player) {
            player = router.query.player
            localStorage.setItem("player", player)
        }
        else {
            player = localStorage.getItem("player")
        }

        let playerName = ''
        if (router.query.n) {
            playerName = router.query.n
            localStorage.setItem(`p${player}Name`, playerName)
        }
        else {
            playerName = localStorage.getItem(`p${player}Name`)
        }

        let word = ''
        if (router.query.w) {
            word = router.query.w
            localStorage.setItem(`p${player}Word`, word)
        }
        else {
            word = localStorage.getItem(`p${player}Word`)
        }
        console.log(word)
        updateSecretWord(word);
        console.log(`init player ${player}`);
        // router.replace('/game', undefined, {shallow:true})
        let letters = {};
        for (let i = 0; i < 26; i++) {
            let c = String.fromCharCode(97 + i);
            letters[c] = 'none';
        }
        let currPlayer = {
            number: player,
            name: playerName,
            secretWord: word,
            letters: letters,
        };
        setCurrPlayer(currPlayer);
    };

    const closeConnection = () => {
        // console.log(socket)
        socket?.close();
    };

    const updateGameState = (newState) => {
        fetch('/api/update', {
            method: 'POST',
            body: JSON.stringify({
                ...gameState,
                ...newState,
            }),
        });
    };

    const startGame = () => {
        console.log("button clicked")
        //   socket.emit("game-start", "the game has started")
        updateGameState({ started: true })
        fetch('/api/start', {
            method: 'POST'
        })
    }

    if (!gameState.done) {
        return (
            <div>
                {/* <p>{JSON.stringify(gameState)}</p>
                <p>{JSON.stringify(currPlayer)}</p>
                <p>{JSON.stringify(otherPlayer)}</p> */}
                <OpponentView word={secretWord} 
                    name={otherPlayer ? otherPlayer.name : "Player 2"}
                    guesses={otherGuesses}
                ></OpponentView>
                <Game secretWord={opponentWord}
                    startGameFn={startGame}
                    started={gameState.started}
                    player={currPlayer ? currPlayer.number : 0}>
                </Game>
            </div>
        );
    }
    else {
        return (
            <div className={styles.gameOver}>
                <h1 className={styles.title}>Game Over</h1>
                <h2>Player {gameState.winner} won!</h2>
                <Link href='/'>
                    <a
                        className={styles.button}>Play Again</a>
                </Link>
            </div>
        )
    }
}

