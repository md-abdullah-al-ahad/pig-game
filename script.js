'use strict';
let playerOneScore = 0;
let playerTwoScore = 0;
let currentScore = 0;
let currentPlayer = 0;
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const holdScore = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

const toRemove = function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
};

const toAdd = function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');
};

const win = function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  diceImg.classList.add('hidden');
  rollDice.disabled = true;
  holdScore.disabled = true;
};

const roll = function () {
  const randomNum = Math.floor(Math.random() * 6) + 1;
  diceImg.src = `assets/dice-${randomNum}.png`;
  if (randomNum === 1) {
    document.querySelector(`#current--${currentPlayer}`).textContent = 0;
    toRemove();
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    toAdd();
    currentScore = 0;
  } else {
    currentScore = currentScore + randomNum;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore;
  }
};

const hold = function () {
  if (currentPlayer === 0) {
    playerOneScore += currentScore;
    document.querySelector(`#score--0`).textContent = playerOneScore;
    if (playerOneScore >= 100) {
      win();
      return;
    }
  } else {
    playerTwoScore += currentScore;
    document.querySelector(`#score--1`).textContent = playerTwoScore;
    if (playerTwoScore >= 100) {
      win();
      return;
    }
  }
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  toRemove();
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  toAdd();
};

const newG = function () {
  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  playerOneScore = 0;
  playerTwoScore = 0;
  currentScore = 0;
  currentPlayer = 0;

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  diceImg.classList.remove('hidden');
  rollDice.disabled = false;
  holdScore.disabled = false;
};

rollDice.addEventListener('click', roll);
holdScore.addEventListener('click', hold);
newGame.addEventListener('click', newG);
