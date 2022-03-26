import styles from '../styles/Letter.module.css'
import { useEffect, useState } from 'react'
export default function Letter(props) {

  const [color, updateColor] = useState(`${styles.darkGrey}`);
  
  const getColor = color => {
    if (color == "green") return `${styles.green}`;
    if (color == "yellow") return `${styles.yellow}`;
    return `${styles.darkGrey}`
  }

  useEffect(() => {
    updateColor(getColor(props.color))
  }, [props.color])

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
