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
            pastGuesses: [
                {
                    word: string,
                    colors: []
                }
            ],
            currentGuess: '', 
            winner: bool
        }
    ]
}