var state = {
    started: bool,
    live: bool,
    done: bool,
    winner: number /*index of player in Array*/,
    players: [
        {
            name: string,
            secretWord: string,
            targetWord: string,
            letters: [
                'green'|'yellow'|'grey'|'none'
            ],
            numGuesses: number,
            pastGuesses: [],
            currentGuess: '', 
            winner: bool
        }
    ]
}