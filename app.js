//*** Words Object ***/
let wordsArray = [
  { word: "Czech", 
    hint: "It has the most castles in Europe",
    type: "Country" },
  {
    word: "Yakisoba",
    hint: "It is a Japanese variety of fried noodles",
    type: "Food",
  },
  {
    word: "Goodfellas",
    hint: "As far back as I can remember, I always wanted to be a gangster",
    type: "Movie",
  },
  {
    word: "Cote Divoire",
    hint: "It is a country in West Africa bordered by Mali, Burkina Faso, Ghana, Liberia and Guinea",
    type: "Country",
  },
  {
    word: "Gnocchi",
    hint: "It is the traditional Italian form of dumplings",
    type: "Food",
  },
  { word: "Jaws", hint: "Steven Spielbergs novie", type: "Movie" },
  {
    word: "Bolivia",
    hint: "It is home to the largest salt deposit in the world.",
    type: "Country",
  },
  { word: "Milkshake", hint: "Milk-based drinks", type: "Food" },
  {
    word: "The Pianist",
    hint: "A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto",
    type: "Movie",
  },
  { word: "Quesadilla",
    hint: "Mexican snack",
    type: "Food" }
];

//*** Class Player ***/
class Player {
  constructor() {
    //this.playerName = playerName
    this.score = 0;
    this.level = 0;
    this.time = 0;
    this.lives = 6;
  }

  setScore() {
    this.score += 50;
    return this.score;
  }

  removeLives() {
    this.lives -= 1;
    return this.lives;
  }
}

//*** Class Game ***/
class Game {
  constructor() {
    this.level = 1;
    this.wrongAttempts = 0;
    this.rocketDistance = 128;
    this.help = 5;
    this.numberOfPlayers = 0;
    this.totalLevels = 4;
  }

  attack() {
    this.rocketDistance += 68;
    return this.rocketDistance;
  }
}

//** Create Variables ***/
let player1;
let game;
let guessingWordObjt = "";
let guessWordsArray = [];
let wordToGuess = ""
let guessWordAuxArr = [];
let guessWordEl = "";
let wordGuessed = false;
let gameStatus = false;

/******************************************** BUTTONS ******************************************/

/*********************/
/* START GAME BUTTON */
/*********************/
let startPlay = document.getElementById("startButton");
startPlay.addEventListener("click", function (evt) {
  evt.preventDefault();
  if(!gameStatus){
    gameStatus = true;
    startGame();
  } 
});

/*********************/
/*    HELP BUTTON    */
/*********************/
let helpButton = document.getElementById("helpButton");
helpButton.addEventListener("click", function (evt) {
  if(gameStatus){
    let container = document.querySelector(".middle-container");
    let p = document.createElement("p");
    p.textContent = guessWordsArray[game.level - 1].hint;
    p.classList.add("hint");
    p.id = "hint";
    container.appendChild(p);
  }
});

/*********************/
/*    STOP BUTTON    */
/*********************/
let stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", function (evt) {
  if(gameStatus){
    //alert('You Loose!!')
    setTimeout(function() {
      setNewGame();
    }, 500);
  }
});

/******************************************* FUNCTIONS ******************************************/

function startGame(){
  game = new Game();
  console.log(game);
  player1 = new Player();
  console.log(player1);
  setGame();
  setKeyboard();
  if(game.level - 1 == 0){
    console.log('level: ' + game.level)
    wordToGuess = guessWordsArray[game.level - 1].word.toLowerCase();
    console.log(wordToGuess);
    showWordGuessingType(guessWordsArray[game.level - 1].type);
    setBlankLetters(wordToGuess);
  }

}

//*** Set the Game Function ***/
function setGame() {
  // Generating four words objects
  for (let i = 0; i < 4; i++) {
    guessingWordObjt = getRandomWord(wordsArray);
    guessWordsArray.push(guessingWordObjt);
  }
  console.log(guessWordsArray)

  let leftContainer = document.querySelector(".left-container");
  let img = document.createElement("img");
  img.id = "rocket";
  img.src = "images/rocket.png";
  leftContainer.appendChild(img);

}

//*** Getting Random Guessing Words Function ***/
function getRandomWord(wordsArray) {
  let randomNumber = Math.floor(Math.random() * 10);
  let randomWordObjt = wordsArray[randomNumber];
  
  return randomWordObjt;
}

//*** Function to show the word guessing type */
function showWordGuessingType(wordType){
  let typeWord = document.querySelector(".middle-container");
  let p = document.createElement("p");
  p.classList.add("type");
  p.id = "type";
  p.textContent = wordType.toUpperCase();
  console.log(p.textContent);
  typeWord.appendChild(p);
}

//*** Function to set the blank letters to the guessing word */
function setBlankLetters(wordGuessing){
  guessWordEl = document.getElementById("blank-letters");
  
  for (let i = 0; i < wordGuessing.length; i++) {
    const letter = wordGuessing[i];
    if (letter == " ") {
      let img = document.createElement("img");
      img.classList.add("alphabet");
      img.src = "images/space.png";
      guessWordEl.appendChild(img);
      guessWordAuxArr.push(" ");
    } else {
      let img = document.createElement("img");
      img.classList.add("alphabet");
      img.src = "images/blank.png";
      guessWordEl.appendChild(img);
      guessWordAuxArr.push("_");
    }
  }
}

//*** Function to add Evt listener to all the keyboard ****/
function setKeyboard(){
  let selectedLetter = document.querySelectorAll("#keyboard img");
  selectedLetter.forEach((imgs) => {
    imgs.addEventListener("click", function (evt) {
      evt.preventDefault();
      compareLetters(evt.target);
      buttonAnimation(evt.target.id);
    });
  });
}

//*** Function to compare clicked letters with guessed word */
function compareLetters(letter){
  let i = 0;
  let letterFound = false;

  while (i < wordToGuess.length) {
    if(letter.id == wordToGuess[i].toLowerCase()) {
      letter.src = "images/correct.png";
      guessWordAuxArr[i] = letter.id;
      letter.style.pointerEvents = "none";
      letterFound = true;
      setGuessedLetters();
      i++;
    } else {
      if(i == wordToGuess.length - 1 && !letterFound){
        letter.src = "images/wrong.png";
        game.wrongAttempts += 1;
        letter.style.pointerEvents = "none";
        let rocketDistance = document.getElementById("rocket");
        rocketDistance.style.top = game.attack() + "px";
        if(game.wrongAttempts >= 7){
          let leftContainer = document.querySelector(".left-container");
          let img = document.createElement("img");
          img.classList.add("explosion");
          img.classList.add("Active");
          img.id = "explosion";
          img.src = "images/explosion.png";
          leftContainer.appendChild(img);
          disableKeyboard();
          setTimeout(function() {
            setNewGame();
          }, 1000);
        }
      }
      i++;
    }  
  }
}

//*** Function to add guessed letters ***/
function setGuessedLetters(){
  guessWordEl.innerHTML = "";
  guessWordAuxArr.forEach((letter) => {
    if (letter == "_") {
      let img = document.createElement("img");
      img.setAttribute("href", "#");
      img.classList.add("alphabet");
      img.src = "images/blank.png";
      guessWordEl.appendChild(img);
    } else if (letter == " ") {
      let img = document.createElement("img");
      img.setAttribute("href", "#");
      img.classList.add("alphabet");
      img.src = "images/space.png";
      guessWordEl.appendChild(img);
    } else {
      let img = document.createElement("img");
      img.setAttribute("href", "#");
      img.classList.add("alphabet");
      img.src = "images/" + letter + "1.png";
      guessWordEl.appendChild(img);
    }
  });
}

//*** Function to konw when the player guessed the word ***/
function equalWords(array1, array2) {
  let result;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    } else {
      result = true;
    }
  }
  return result;
}

//*** Clear all correct and wrong letters */
function clearAll(){

  let keyboard = document.querySelectorAll("#keyboard img");
  keyboard.forEach((img) => {
    img.src = "images/" + img.id + ".png";
    img.style.pointerEvents = "initial";
    img.classList.remove("disableLetter");
  });

  let removeExplosion = document.getElementById("explosion");
  if(removeExplosion){
    removeExplosion.parentNode.removeChild(removeExplosion);
  }
  
  let removeHint = document.getElementById("hint");
  if(removeHint){
    removeHint.parentNode.removeChild(removeHint);
  }

  let removeType = document.getElementById("type");
  if(removeType){
    removeType.parentNode.removeChild(removeType);
  }

  let removeRocket = document.getElementById("rocket");
  if(removeRocket){
    removeRocket.parentNode.removeChild(removeRocket);
  }
  
  // let rocketDistance = document.getElementById("rocket");
  // if(rocketDistance.style.top != "128px"){
  //   rocketDistance.style.top = "128px";
  //   game.rocketDistance = 128;
  // }

  game.wrongAttempts = 0;
  
}


//*** Disable all the letters ***/
function disableKeyboard(){
  selectedLetters = document.querySelectorAll("#keyboard img");
  selectedLetters.forEach((letter) => {
    letter.classList.add("disableLetter");
    letter.style.pointerEvents = "none";
  });
}

//*** Button Animation ***/
function buttonAnimation(buttonPressed) {

  var activeButton = document.querySelector("#" + buttonPressed);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}

function setNewGame(){
  clearAll();
  player1 = {};
  game = {};
  guessingWordObjt = "";
  guessWordsArray = [];
  wordToGuess = ""
  guessWordAuxArr = [];
  guessWordEl.innerHTML = "";
  selectedLetter = "";
  wordGuessed = false;
  gameStatus = false;
}