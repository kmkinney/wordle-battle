import Letter from './Letter';
import styles from '../styles/WordGuess.module.css';
import { useEffect, useState } from 'react';

export default function WordGuess(props) {
  const [word, updateWord] = useState('');

  useEffect(() => {}, [word]);

  return (
    <div className={styles.container}>
      <Form word={word} updateWord={updateWord} />
      <Letter letter={word[0] == null ? '' : word[0]} unknownWord={props.unknownWord}/>
      <Letter letter={word[1] == null ? '' : word[1]} unknownWord={props.unknownWord}/>
      <Letter letter={word[2] == null ? '' : word[2]} unknownWord={props.unknownWord}/>
      <Letter letter={word[3] == null ? '' : word[3]} unknownWord={props.unknownWord}/>
      <Letter letter={word[4] == null ? '' : word[4]} unknownWord={props.unknownWord}/>
    </div>
  );
}

function Form(props) {

  const [focus, setFocus] = useState(true);

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
        autoFocus
      />
    </form>
  );
}
