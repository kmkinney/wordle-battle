import { useState, useEffect } from "react";
import WordGuess from './WordGuess';
import Head from 'next/head'
import styles from '../styles/Home.module.css';

export default function Game(props) {
    const [focus, updateFocus] = useState(1);
    const [submitted1, wasSubmitted1] = useState(false);
    const [submitted2, wasSubmitted2] = useState(false);
    const [submitted3, wasSubmitted3] = useState(false);
    const [submitted4, wasSubmitted4] = useState(false);
    const [submitted5, wasSubmitted5] = useState(false);
    const [submitted6, wasSubmitted6] = useState(false);

    useEffect(() => {
        if(submitted6){
            console.log("OUT OF GUESSES")
            props.updateOutOfGuesses(true)
        }
    }, [submitted6])

    if (!props.started) {
        return (
            <div className={styles.start}>
                <button className={styles.startBtn} onClick={props.startGameFn}>Start</button>
            </div>
        )
    }
    else {
        return (
            <div className={styles.container}
                 onMouseDown={(e) => e.preventDefault()}>
                <Head>
                    <title>Wordle Off</title>
                    <meta name='description' content='Generated by create next app' />
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                <main className={styles.main}>
                    <h1>{props.name}</h1>
                    <WordGuess
                        player={props.player}
                        targetWord={props.secretWord}
                        index={1}
                        focus={focus}
                        updateFocus={updateFocus}
                        submitted={submitted1}
                        wasSubmitted={wasSubmitted1}
                    />
                    <WordGuess
                        player={props.player}
                        targetWord={props.secretWord}
                        index={2}
                        focus={focus}
                        updateFocus={updateFocus}
                        submitted={submitted2}
                        wasSubmitted={wasSubmitted2}
                    />
                    <WordGuess
                        player={props.player}
                        targetWord={props.secretWord}
                        index={3}
                        focus={focus}
                        updateFocus={updateFocus}
                        submitted={submitted3}
                        wasSubmitted={wasSubmitted3}
                    />
                    <WordGuess
                        player={props.player}
                        targetWord={props.secretWord}
                        index={4}
                        focus={focus}
                        updateFocus={updateFocus}
                        submitted={submitted4}
                        wasSubmitted={wasSubmitted4}
                    />
                    <WordGuess
                        player={props.player}
                        targetWord={props.secretWord}
                        index={5}
                        focus={focus}
                        updateFocus={updateFocus}
                        submitted={submitted5}
                        wasSubmitted={wasSubmitted5}
                    />
                    <WordGuess
                        player={props.player}
                        targetWord={props.secretWord}
                        index={6}
                        focus={focus}
                        updateFocus={updateFocus}
                        submitted={submitted6}
                        wasSubmitted={wasSubmitted6}
                    />
                </main>
                );
            </div>
        )
    }
}
