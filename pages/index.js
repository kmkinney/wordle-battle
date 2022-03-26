import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
    const [playerOneName, setPlayerOneName] = useState('')
    const [playerOneWord, setPlayerOneWord] = useState('')
    const [playerTwoWord, setPlayerTwoWord] = useState('')
    const [playerTwoName, setPlayerTwoName] = useState('')
    const [p2Hint, setP2Hint] = useState('')
    const [p1Hint, setP1Hint] = useState('')

    const [isP1Valid, setP1Valid] = useState(false)
    const [isP2Valid, setP2Valid] = useState(false)

    useEffect(() => {
        localStorage.clear()
    }, [])

    useEffect(() => {
        let isWordValid = playerOneWord.match(/^[A-Za-z]{5}$/)
        setP1Valid(isWordValid && playerOneName !== '')
    }, [playerOneName, playerOneWord])

    useEffect(() => {
        let isWordValid = playerTwoWord.match(/^[A-Za-z]{5}$/)
        setP2Valid(isWordValid && playerTwoName !== '')
    }, [playerTwoName, playerTwoWord])

    useEffect(() => {
        setP2Hint(isP2Valid ? 
            'Ready to go!' : 'Enter a name and a 5 letter word')
    }, [isP2Valid])

    useEffect(() => {
        setP1Hint(isP1Valid ? 
            'Ready to go!' : 'Enter a name and a 5 letter word')
    }, [isP1Valid])

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
                        <p className={styles.hint}>
                            {p1Hint}
                        </p>
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
                        <Link href={isP1Valid ? `/players/1?n=${playerOneName}&w=${playerOneWord}` : '#'}
                            className={isP1Valid ? '' : 'disabled'}>
                            <a
                                className={styles.button}>Join as Player 1</a>
                        </Link>
                    </div>

                    <div className={styles.player}>
                        <p className={styles.hint}>
                            {p2Hint}
                        </p>
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
                        <Link href={isP2Valid ? `/players/2?n=${playerTwoName}&w=${playerTwoWord}` : '#'}
                            className={isP2Valid ? '' : styles.disabled}>
                            <a
                                className={styles.button}>Join as Player 1</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

