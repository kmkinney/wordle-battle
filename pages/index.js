import Head from 'next/head';
import styles from '../styles/Home.module.css';
import WordGuess from '../components/WordGuess';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [targetWord, updateTargetWord] = useState('tears');
  const [focus, updateFocus] = useState(1);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wordle Off</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <WordGuess
          targetWord={targetWord}
          index={1}
          focus={focus}
          updateFocus={updateFocus}
        />
        <WordGuess
          targetWord={targetWord}
          index={2}
          focus={focus}
          updateFocus={updateFocus}
        />
        <WordGuess
          targetWord={targetWord}
          index={3}
          focus={focus}
          updateFocus={updateFocus}
        />
        <WordGuess
          targetWord={targetWord}
          index={4}
          focus={focus}
          updateFocus={updateFocus}
        />
        <WordGuess
          targetWord={targetWord}
          index={5}
          focus={focus}
          updateFocus={updateFocus}
        />
        <WordGuess
          targetWord={targetWord}
          index={6}
          focus={focus}
          updateFocus={updateFocus}
        />
      </main>
    </div>
  );
}
