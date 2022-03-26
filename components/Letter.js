import styles from '../styles/Letter.module.css'
export default function Letter(props) {
  return (
    <div className={styles.flipCard}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <p>{props.letter}</p>
        </div>
        <div className={styles.flipCardBack}>
        </div>
      </div>
    </div>
  )
}
