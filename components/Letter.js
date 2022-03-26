import styles from '../styles/Letter.module.css';
import { useEffect, useState } from 'react';
export default function Letter(props) {
  const [color, updateColor] = useState(`${styles.darkGrey}`);
  const [isFlipped, setFlipped] = useState(false);

  const getColor = (color) => {
    if (color == 'green') return `${styles.green}`;
    if (color == 'yellow') return `${styles.yellow}`;
    return `${styles.darkGrey}`;
  };

  useEffect(() => {
    updateColor(getColor(props.color));
  }, [props.color]);

  useEffect(() => {
    if (props.submitted) {
      setFlipped(true);
    }
  }, [props.submitted])

  return (
    <div
      className={styles.flipCard}
      style={isFlipped == true ? { transform: 'rotateX(180deg)' } : {}}
    >
      <div
        className={styles.flipCardInner}
        style={isFlipped == true ? { transform: 'rotateX(180deg)' } : {}}
      >
        <div className={styles.flipCardFront}>
          <p>{props.letter}</p>
        </div>
        <div className={`${styles.flipCardBack} ${color}`}>
          <p style={{transform: 'rotateY(180deg)'}}>{props.letter}</p>
        </div>
      </div>
    </div>
  );
}
