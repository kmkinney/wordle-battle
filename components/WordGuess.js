import Letter from './Letter';
import styles from '../styles/WordGuess.module.css';
import { useEffect, useState, useRef } from 'react';

export default function WordGuess(props) {
  const [word, updateWord] = useState('');
  const [colors, updateColors] = useState([]);
  const [submitted, wasSubmitted] = useState(false);

  useEffect(() => {
    updateColors(getColors(props.targetWord, word));
  }, [word, submitted]);

  function Letters(props) {
    return (
      <>
        {props.targetWord.split('').map((char, index) => {
          return (
            <Letter
              key={index}
              letter={word[index] == null ? '' : word[index]}
              color={colors[index]}
              flipLetter={props.submitted}
              submitted={submitted}
              targetWord={props.targetWord}
            />
          );
        })}
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Form
        word={word}
        updateWord={updateWord}
        wasSubmitted={wasSubmitted}
        targetWord={props.targetWord}
      />
      <Letters submitted={submitted} targetWord={props.targetWord} />
    </div>
  );
}

function Form(props) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const changeWord = (event) => {
    props.updateWord(event.target.value);
    event.preventDefault(); // don't redirect the page
  };

  const submitWord = (event) => {
    event.preventDefault(); // don't redirect the page
    if (event.target[0].value.length == props.targetWord.length) {
      props.wasSubmitted(true);
    }
  };

  return (
    <form className={styles.input} onSubmit={submitWord}>
      <input
        className={styles.hidden}
        type='text'
        required
        spellCheck='false'
        onKeyUp={changeWord}
        onBlur={({ target }) => target.focus()}
        autoFocus={true}
        ref={inputRef}
        maxLength={5}
      />
      <input className={styles.hidden} type='submit' value='Submit'></input>
    </form>
  );
}

/**
 * Gets the colors associated with a guess and target word
 *
 * @param {*} target
 * @param {*} guess
 * @returns
 */
function getColors(target, guess) {
  let colors = [];
  let tlc = new Map();
  for (let i = 0; i < target.length; i++) {
    let tl = target[i];
    if (tlc.has(tl)) {
      tlc.set(tl, tlc.get(tl) + 1);
    } else {
      tlc.set(tl, 1);
    }
  }
  for (let i = 0; i < target.length; i++) {
    let tl = target[i];
    let gl = guess[i];
    if (tl === gl) {
      colors.push('green');
      tlc.set(gl, tlc.get(gl) - 1);
    } else if (tlc.has(gl) && tlc.get(gl) > 0) {
      colors.push('yellow');
      tlc.set(gl, tlc.get(gl) - 1);
    } else {
      colors.push('grey');
    }
  }
  return colors;
}
