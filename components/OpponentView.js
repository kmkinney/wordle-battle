import styles from '../styles/Opponent.module.css'

export default function OpponentView(props) {
    const opponentName = props.name
    const secretWord = props.word.toUpperCase()

    let guesses = [
        {
            word: "kevin",
            colors: ['green', 'yellow', 'grey', 'grey', 'grey']
        },
        {
            word: "kevin",
            colors: ['green', 'green', 'grey', 'grey', 'grey']
        },
        {
            word: "kevin",
            colors: ['green', 'yellow', 'yellow', 'grey', 'grey']
        }
    ]

    guesses = props.guesses
    return (
        <div className={styles.opponentView}>
            <p>{opponentName}</p>
            <h2>{secretWord}</h2>
            {guesses.map((guess, index) => {
                return (
                    <Guess key={index} colorArray={guess.colors} guess={guess.word}/>
                )
            })}
        </div>
    )
}

function Guess(props) {
    const colors = props.colorArray
    const guess = props.guess

    return (
        <div className={styles.guessLine}>
            {guess.split("").map((letter, index) => {
                return (
                    <div key={index} className={`${styles.letterCard} ${styles[colors[index]]}`}>
                        <p className={styles.letter}>{letter}</p>
                    </div>
                )
            })}
        </div>
    )

}