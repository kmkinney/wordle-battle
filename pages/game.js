import { Router } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { io } from 'socket.io-client';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import WordGuess from '../components/WordGuess';
import Link from 'next/link';
let socket;

const startState = {
  started: false,
  live: false,
  done: false,
  winner: -1 /*index of player in Array*/,
  players: [],
};

const defaultPlayer = {
  name: '',
  secretWord: '',
  targetWord: '',
  letters: {},
  numGuesses: 0,
  pastGuesses: [],
  currentGuess: '',
  winner: false,
};

const targetWord = 'tests';

export default function Game() {
  const [gameState, setGameState] = useState(startState);
  const [playerName, setPlayerName] = useState('');
  const [secretWord, setSecretWord] = useState('');
  const [targetWord, updateTargetWord] = useState('tears');
  const [focus, updateFocus] = useState(1);
  const [submitted1, wasSubmitted1] = useState(false);
  const [submitted2, wasSubmitted2] = useState(false);
  const [submitted3, wasSubmitted3] = useState(false);
  const [submitted4, wasSubmitted4] = useState(false);
  const [submitted5, wasSubmitted5] = useState(false);
  const [submitted6, wasSubmitted6] = useState(false);

  useEffect(() => {
    initSocket();
    return closeConnection();
  }, []);

  const initSocket = async () => {
    await fetch('/api/socket');
    socket = io();
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('update-game-state', (newState) => {
      console.log('Game State Updated');
      console.log(newState);
      // processUpdate(newState)
      // if(gameState != newState)
      setGameState(newState);
    });

    socket.on('game-end', (newState) => {
      console.log('Game has ended');
    });
  };

  const closeConnection = () => {
    // console.log(socket)
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

  const addPlayer = () => {
    let currPlayers = gameState.players;
    console.log('NUM PLAYERS ' + currPlayers.length);
    console.log(currPlayers);
    let letters = {};
    for (let i = 0; i < 26; i++) {
      let c = String.fromCharCode(97 + i);
      letters[c] = 'none';
    }
    console.log(letters);
    currPlayers.push({
      name: playerName,
      secretWord: secretWord,
      targetWord: '',
      letters: letters,
      numGuesses: 0,
      pastGuesses: [],
      currentGuess: '',
      winner: false,
    });
    updateGameState({ players: currPlayers });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Wordle Off</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* <p>{JSON.stringify(gameState)}</p> */}
      {/* <p>Started: {'' + gameState.started}</p> */}
      {/* <p>Live: {'' + gameState.live}</p> */}
      {/* <p>Done: {'' + gameState.done}</p> */}
      {/* <p>PlayerCount: {gameState.players.length}</p> */}
      {/* <button onClick={() => updateGameState({ started: true })}>Start</button> */}
      {/* <button */}
      {/*   onClick={(e) => { */}
      {/*     e.preventDefault(); */}
      {/*     console.log(socket); */}
      {/*     updateGameState(startState); */}
      {/*   }} */}
      {/* > */}
      {/*   Reset */}
      {/* </button> */}
      {/* <h2>Player Info</h2> */}
      {/* <input */}
      {/*   placeholder='Enter your name' */}
      {/*   value={playerName} */}
      {/*   onChange={(e) => setPlayerName(e.target.value)} */}
      {/* /> */}
      {/* <input */}
      {/*   placeholder='Enter your Secret Word' */}
      {/*   value={secretWord} */}
      {/*   onChange={(e) => setSecretWord(e.target.value)} */}
      {/* /> */}
      {/* <button */}
      {/*   onClick={() => { */}
      {/*     addPlayer(); */}
      {/*   }} */}
      {/* > */}
      {/*   Add Player */}
      {/* </button> */}
      <main className={styles.main}>
        <WordGuess
          targetWord={targetWord}
          index={1}
          focus={focus}
          updateFocus={updateFocus}
          submitted={submitted1}
          wasSubmitted={wasSubmitted1}
        />
        <WordGuess
          targetWord={targetWord}
          index={2}
          focus={focus}
          updateFocus={updateFocus}
          submitted={submitted2}
          wasSubmitted={wasSubmitted2}
        />
        <WordGuess
          targetWord={targetWord}
          index={3}
          focus={focus}
          updateFocus={updateFocus}
          submitted={submitted3}
          wasSubmitted={wasSubmitted3}
        />
        <WordGuess
          targetWord={targetWord}
          index={4}
          focus={focus}
          updateFocus={updateFocus}
          submitted={submitted4}
          wasSubmitted={wasSubmitted4}
        />
        <WordGuess
          targetWord={targetWord}
          index={5}
          focus={focus}
          updateFocus={updateFocus}
          submitted={submitted5}
          wasSubmitted={wasSubmitted5}
        />
        <WordGuess
          targetWord={targetWord}
          index={6}
          focus={focus}
          updateFocus={updateFocus}
          submitted={submitted6}
          wasSubmitted={wasSubmitted6}
        />
      </main>
      );
    </div>
  );
}
