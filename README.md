# Hangman_Project

This game has the same theme as Hangman. What makes it different from Hangman, is that Space Invaders launches a rocket and every time a letter is not guessed the rocket advances until it hits the earth.

Each player must pass four levels in order to be the winner. He has only 7 chances to guess the word and has 4 extra lives to win the game.

It has 3 buttons, one to start the game, one for help (shows a hint) and the last one to stop the game.


# *** Class Player and Game ***

a class of each is created when the game is started.

class Player ()
class Game ()

# *** Variables are initialized ***
let player1;
let game;
let guessingWordObjt = "";
let guessWordsArray = [];
let wordToGuess = ""
let guessWordAuxArr = [];
let guessWordEl = "";
let selectedLetter = "";
let wordGuessed = false;

# ******************************************** BUTTONS ******************************************

# *** Start Game Bottom ***
let startPlay = document.getElementById("startButton");
startPlay.addEventListener("click", function (evt) {
  evt.preventDefault();
  startGame();
});

# *** Help Button ***
let helpButton = document.getElementById("helpButton");
helpButton.addEventListener("click", function (evt) {
  let container = document.querySelector(".middle-container");
  let p = document.createElement("p");
  p.textContent = guessingWordObjt.hint;
  p.classList.add("hint");
  container.appendChild(p);
});


# ******************************************* FUNCTIONS ******************************************

# *** Start Game Function ***
function startGame()

# *** Set the Game Function ***/
function setGame() 

# *** Getting Random Guessing Words Function ***/
function getRandomWord(wordsArray)

# *** Function to show the word guessing type ***/
function showWordGuessingType(wordType)

# *** Function to set the blank letters to the guessing word ***
function setBlankLetters(wordGuessing)

# *** Function to add Evt listener to all the keyboard ****
function setKeyboard()

# *** Function to compare clicked letters with guessed word ***
function compareLetters(letter)

# *** Function to add guessed letters ***
function setGuessedLetters()

# *** Function to konw when the player guessed the word ***
function equalWords(array1, array2)
