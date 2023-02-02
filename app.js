//*** Words Object ***/
let wordsArray = [
    {word: 'Czech Republic', hint: 'It has the most castles in Europe'},
    {word: 'Yakisoba', hint: 'It is a Japanese variety of fried noodles'},
    {word: 'Goodfellas', hint: 'As far back as I can remember, I always wanted to be a gangster'}
]

class Player{
    constructor(playerName){
        this.playerName = playerName
        this.score = 0
        this.level = 0
        this.time = 0
        this.hint = 0
        this.lives = 0
    }
}

function getRandomWord(wordsArray) {
    let randomNumber = Math.floor(Math.random() )
    let randomWord = wordsArray[randomNumber] 
    console.log(randomWord)

    return randomWord
}

let gessingWord = getRandomWord(wordsArray)