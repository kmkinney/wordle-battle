import Letter from './Letter';
import styles from '../styles/WordGuess.module.css';
import { useEffect, useState, useRef } from 'react';

export default function WordGuess(props) {
  const [word, updateWord] = useState('');
  const [colors, updateColors] = useState(["darkGrey", "darkGrey", "darkGrey", "darkGrey", "darkGrey",])

  useEffect(() => {}, [word]);

  return (
    <div className={styles.container}>
      <Form word={word} updateWord={updateWord} />
      <Letter
        letter={word[0] == null ? '' : word[0]}
        color={colors[0]}
      />
      <Letter
        letter={word[1] == null ? '' : word[1]}
        color={colors[1]}
      />
      <Letter
        letter={word[2] == null ? '' : word[2]}
        color={colors[2]}
      />
      <Letter
        letter={word[3] == null ? '' : word[3]}
        color={colors[3]}
      />
      <Letter
        letter={word[4] == null ? '' : word[4]}
        color={colors[4]}
      />
    </div>
  );
}

function Form(props) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const changeWord = (event) => {
    event.preventDefault(); // don't redirect the page
    console.log(event);
    props.updateWord(event.target.value);
  };

  return (
    <form className={styles.input}>
      <input
        className={styles.word}
        type='text'
        required
        spellCheck='false'
        onKeyUp={changeWord}
        onBlur={({ target }) => target.focus()}
        autoFocus={true}
        ref={inputRef}
        maxLength={5}
      />
    </form>
  );
}
