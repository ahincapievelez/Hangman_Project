//*** Words Object ***/
let wordsArray = [
  { word: "Czech", hint: "It has the most castles in Europe", type: "Country"},
  { word: "Yakisoba", hint: "It is a Japanese variety of fried noodles", type: "Food"},
  { word: "Goodfellas", hint: "As far back as I can remember, I always wanted to be a gangster", type: "Movie"},
  { word: "Cote Divoire", hint: "It iss a country in West Africa bordered by Mali, Burkina Faso, Ghana, Liberia and Guinea", type: "Country"},
  { word: "Gnocchi", hint: "It is the traditional Italian form of dumplings", type: "Food"},
  { word: "Jaws", hint: "Steven Spielbergs novie", type: "Movie"},
  { word: "Bolivia", hint: "It is home to the largest salt deposit in the world.", type: "Country"},
  { word: "Milkshake", hint: "Milk-based drinks", type: "Food"},
  { word: "The Pianist", hint: "A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto", type: "Movie"},
  { word: "Quesadilla", hint: "Mexican snack", type: "Food"},
];

class Player {
  constructor() {
    //this.playerName = playerName
    this.score = 0;
    this.level = 1;
    this.time = 0;
    this.hint = 0;
    this.lives = 6;
  }

  getScore() {
    this.score += 50;
    return this.score
  }

  getLevel() {
    this.level += 1;
    return this.level
  }

  checkLives() {
    this.lives -= 1;
    return this.lives
  }
}

class Game {
  constructor(){
    this.clickedWrong = 0;
    this.rocketDistance = 128;
    this.help = 5;
  }
  attack(){
    this.rocketDistance += 68
    return this.rocketDistance
  }
}

//** Players are created ***/
let player1
let player2
let playersArray = [];
let gamesArray = [];

//*** Esta funcion retorna un numero aleatorio para obtener del vector la palabra que se debe adivinar ***/
function getRandomWord(wordsArray) {
  let randomNumber = Math.floor(Math.random() * 10);
  let randomWord = wordsArray[randomNumber];
  console.log(randomWord);

  return randomWord;
}

let guessingWord = getRandomWord(wordsArray);
let guessWordArray = guessingWord.word.toLowerCase();

  //*** Class game created ***/
  let game = new Game()

let numberOfPlayers = prompt("Press 1 for one player game. Press 2 for two player game");
  if (numberOfPlayers == 1) {
    player1 = new Player();
  } else {
    player1 = new Player();
    playersArray.push(player1);
    
    player2 = new Player();
    playersArray.push(player2);
  }

//*** Esta funcion permite inicializar el juego para comenzar a jugar ***/
function startGame() {




  let guessWordAuxArr = []

  //*** Este bloque, permite mostrar la palabra a adivinar en la pagina ***/
  let typeWord = document.querySelector(".middle-container");
  let p = document.createElement('p');
  p.classList.add('type');
  p.textContent = guessingWord.type.toUpperCase();
  console.log(p.textContent)
  typeWord.appendChild(p)

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
  let selectedLetter = document.querySelectorAll("#keyboard img");

  selectedLetter.forEach(imgs => {
    imgs.addEventListener("click", function (evt) {
        evt.preventDefault();
        
        if(game.clickedWrong == 6){
          //imgs.removeEventListener('click');
          document.getElementById('lives1').innerHTML = player1.checkLives()
          console.log(player1.checkLives())
          let leftContainer = document.querySelector(".left-container")
          console.dir(leftContainer)
          let img = document.createElement('img')
          img.classList.add("explosion");
          img.src = "images/explosion.png";
          leftContainer.appendChild(img);
          // let body = document.querySelector('body')
          // body.style.backgroundColor = "black"
          // body.style.opacity = 0.3
        }

        let i = 0
        let letterFound = false
        while (i < guessWordArray.length) {
          if(evt.target.id == guessWordArray[i].toLowerCase()){
              evt.target.src = "images/correct.png";
              guessWordAuxArr[i] = evt.target.id
              evt.target.style.pointerEvents = 'none';
              letterFound = true
              let wordGuessed = equalWords(guessWordArray, guessWordAuxArr)
              if(wordGuessed){
                document.getElementById('score1').innerHTML = player1.getScore()
                console.log('wordGuessed = ' + wordGuessed)
              }
              i++
          } else if(i == guessWordArray.length - 1 && !letterFound){
                evt.target.src = "images/wrong.png";
                evt.target.style.pointerEvents = 'none';
                let rocketDistance = document.getElementById('rocket')
                rocketDistance.style.top = game.attack() + 'px'
                game.clickedWrong++
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

function equalWords(array1, array2){
  let result
  for (let i = 0; i < array1.length; i++) {
    if(array1[i] !== array2[i]){
      return false
    } else {
      result = true
    }
  }
  return result
}

//*** Start game button function ***/
let startPlay = document.getElementById("startButton");
startPlay.addEventListener("click", function(evt){
  evt.preventDefault();
  startGame();
});

//*** Help Button function ***/
let helpButton = document.getElementById("helpButton");
helpButton.addEventListener('click', function(evt){
  evt.preventDefault();
  let container = document.querySelector(".middle-container");
  console.log(container)
  let p = document.createElement('p');
  p.textContent = guessingWord.hint;
  p.classList.add("hint");
  container.appendChild(p);
});

//*** Esta funcion muestra la ayuda para adivinar la palabra. Cada jugar solo tiene 3 oportunidades de usar la ayuda ***/
function help() {}

//*** Esta funcion permite salir del juego. Se inicializa todo ***/
function stopGame() {}
