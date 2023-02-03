//*** Words Object ***/
let wordsArray = [
  { word: "Czech Republic", hint: "It has the most castles in Europe" },
  { word: "Yakisoba", hint: "It is a Japanese variety of fried noodles" },
  { word: "Goodfellas", hint: "As far back as I can remember, I always wanted to be a gangster"}
];

class Player {
  constructor() {
    //this.playerName = playerName
    this.score = 0;
    this.level = 0;
    this.time = 0;
    this.hint = 0;
    this.lives = 0;
  }

  getScore() {
    this.score += 50;
  }

  getLevel() {
    this.level += 1;
  }

  checkLives() {
    this.lives -= 1;
  }
}

class Game {
  constructor(){
    this.clickedWrong = 0
    this.rocketDistance = 128
  }
  attack(){
    this.rocketDistance += 68
    return this.rocketDistance
  }
}

//*** Esta funcion permite inicializar el juego para comenzar a jugar ***/
function startGame() {

  //*** Class game created ***/
  let game = new Game()

  //** Players are created ***/
  let playersArray = [];
  let numberOfPlayers = prompt("Press 1 for one player game. Press 2 for two player game");
  if (numberOfPlayers == 1) {
    let player1 = new Player();
  } else {
    let player1 = new Player();
    playersArray.push(player1);
    
    let player2 = new Player();
    playersArray.push(player2);
  }

  //*** Esta funcion retorna un numero aleatorio para obtener del vector la palabra que se debe adivinar ***/
  function getRandomWord(wordsArray) {
    let randomNumber = Math.floor(Math.random());
    let randomWord = wordsArray[randomNumber];
    console.log(randomWord);

    return randomWord;
  }

  let guessingWord = getRandomWord(wordsArray);
  let guessWordArray = guessingWord.word;
  let guessWordAuxArr = []

  //*** Este bloque, permite mostrar la palabra a adivinar en la pagina ***/
  let guessWordEl = document.getElementById("blank-letters");

  for (let i = 0; i < guessWordArray.length; i++) {
    const letter = guessWordArray[i];
    if (letter == " ") {
      let img = document.createElement("img");
      img.classList.add("alphabet");
      img.src = "images/space.png";
      guessWordEl.appendChild(img);
      guessWordAuxArr.push(" ")
    } else {
      let img = document.createElement("img");
      img.classList.add("alphabet");
      img.src = "images/blank.png";
      guessWordEl.appendChild(img);
      guessWordAuxArr.push("_")
    }
  }

  //*** Function for all the letters and adding the event listener */
  let attemptsWrong = 0
  let selectedLetter = document.querySelectorAll("#keyboard img");

  selectedLetter.forEach(imgs => {
    imgs.addEventListener("click", function (evt) {
        evt.preventDefault();
        
        if(attemptsWrong == 6){
          console.log('Si funciona el IF statement')
        }

        let i = 0
        let letterFound = false
        while (i < guessWordArray.length) {
          if(evt.target.id == guessWordArray[i].toLowerCase()){
              evt.target.src = "images/correct.png";
              guessWordAuxArr[i] = evt.target.id
              letterFound = true
              i++
          } else if(i == guessWordArray.length - 1 && !letterFound){
                console.log(guessWordAuxArr[i])
                evt.target.src = "images/wrong.png";
                let rocketDistance = document.getElementById('rocket')
                rocketDistance.style.top = game.attack() + 'px'
                attemptsWrong++
                i++
            } else {
                i++
            }
        }

        guessWordEl.innerHTML = ""
        guessWordAuxArr.forEach(letter => {
            if(letter == "_"){
                let img = document.createElement('img')
                img.setAttribute("href", "#")
                img.classList.add("alphabet");
                img.src = "images/blank.png";
                guessWordEl.appendChild(img);
            } else if(letter == " "){
                let img = document.createElement('img')
                img.setAttribute("href", "#")
                img.classList.add("alphabet");
                img.src = "images/space.png";
                guessWordEl.appendChild(img);
            } else {
                let img = document.createElement('img')
                img.setAttribute("href", "#")
                img.classList.add("alphabet");
                img.src = "images/" + letter + "1.png";
                guessWordEl.appendChild(img);
            }
        })
      });
  })

}

//*** Start game button function ***/
let startPlay = document.getElementById("startButton");
startPlay.addEventListener("click", function (evt) {
  evt.preventDefault();
  // let body = document.querySelector('body')
  // body.style.backgroundColor = "black"
  // body.style.opacity = 0.3
  // console.dir(body)
  startGame();
});

//*** Esta funcion muestra la ayuda para adivinar la palabra. Cada jugar solo tiene 3 oportunidades de usar la ayuda ***/
function help() {}

//*** Esta funcion permite salir del juego. Se inicializa todo ***/
function stopGame() {}
