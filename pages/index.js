import Head from 'next/head'
import styles from '../styles/Home.module.css'
import WordGuess from '../components/WordGuess'
import { useState } from 'react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
    const [playerOneName, setPlayerOneName] = useState('')
    const [playerOneWord, setPlayerOneWord] = useState('')
    const [playerTwoWord, setPlayerTwoWord] = useState('')
    const [playerTwoName, setPlayerTwoName] = useState('')

    useEffect(() => {
        localStorage.clear()
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Wordle Off</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <h1 className={styles.title}>Wordle Battle</h1>
                <div className={styles.buttonArea}>
                    <div className={styles.player}>
                        <input
                            className={styles.textInput}
                            placeholder="Enter your name"
                            onChange={(e) => setPlayerOneName(e.target.value)}
                        />
                        <input
                            className={styles.textInput}
                            placeholder="Enter your secret word"
                            onChange={(e) => setPlayerOneWord(e.target.value)}
                        />
                        <Link href={`/players/1?n=${playerOneName}&w=${playerOneWord}`}>
                            <a
                                className={styles.button}>Join as Player 1</a>
                        </Link>
                    </div>

                    <div className={styles.player}>
                        <input
                            className={styles.textInput}
                            placeholder="Enter your name"
                            onChange={(e) => setPlayerTwoName(e.target.value)}
                        />
                        <input
                            className={styles.textInput}
                            placeholder="Enter your secret word"
                            onChange={(e) => setPlayerTwoWord(e.target.value)}
                        />
                        <Link href={`/players/2?n=${playerTwoName}&w=${playerTwoWord}`}>
                            <a
                                className={styles.button}>Join as Player 2</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

