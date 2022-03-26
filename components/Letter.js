import styles from '../styles/Letter.module.css'
import { useEffect, useState } from 'react'
export default function Letter(props) {

  const [color, updateColor] = useState(`${styles.darkGrey}`);
  
  // const getColor = () => {
  //   if (props.letter == targetLetter) return `${styles.green}`;
  //   if (props.letter !== "" && props.targetWord.includes(props.letter)) {
  //     return `${styles.yellow}`;
  //   } 
  //   return `${styles.darkGrey}`
  // }

  // useEffect(() => {
  //   updateColor(getColor(props.targetLetter, props.typedWord))
  // }, [props.letter])

  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <p>{props.letter}</p>
        </div>
        <div className={`${styles.flipCardBack} ${color}`}>
        </div>
      </div>
    </div>
  )
}
