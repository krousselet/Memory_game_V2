let cards = document.querySelectorAll('.card');
let frontPage = document.querySelector('.front-page');
let buttonsDisplay = document.querySelector('.buttons-container');
let easyB = document.querySelector('.easy-btn');
let buttons = document.querySelectorAll('button');
let mediumB = document.querySelector('.medium-btn');
let hardB = document.querySelector('.hard-btn');
let mastermindB = document.querySelector('.mastermind-btn');
let easyGame = document.querySelector('.easy-game');
let mediumGame = document.querySelector('.medium-game');
let hardGame = document.querySelector('.hard-game');
let mastermindGame = document.querySelector('.mastermind-game');
let buttonClicked = false;
let cardFlipped = false;
let firstCard, secondCard;
let lockBoard = false;
let scoring = 0;
let flipsCount = document.querySelector('.flips-count');
let score = document.querySelector('.score');
let timer = document.querySelector('.timer');
let flips = 0;
let scoreDisplay = document.querySelector('.score');
let time = 240;
let randomIndex = 0;
let img = document.querySelectorAll('img');
let endGame = false;
let lost = document.querySelector('.lost');
let won = document.querySelector('.won');
let allGames = document.querySelector('.all-games');
let again = document.querySelector('.try-again');
let winThree = false;
let winSix = false;
let winNine = false;
let winTwelve = false;
let easyWin = false;
let mediumWin = false;
let hardWin = false;
let mastermindWin = false;
let pause = document.querySelector('.pause');
let resume = document.querySelector('.resume');
let pauseCount = false;

// Problems I encountered :
// BEWARE to set the data-attribute on the card, and not on the image !!! //
// If the player is to swift he can unravel too many cards at once ! //
// If the player clicked two times on the same card, it disabled it //

//                                   MES FONCTIONS                               ////////////////


// function winTheGameEasy() {
//   if (scoring === 3) {
//     endGame = true;
//   } else if (endGame === true) {
//     document.body.style.display = 'none';
//   }
// }

function Timer() {

  if (this instanceof Timer === false) {
    return new Timer();
  }

  let debut = 0, ecoule = 0;

  this.started = this.paused = false;

  this.start = function () {

    if (!this.started) {
      this.paused = false;
      this.started = true;
      debut = + new Date();
      ecoule = 0;
    }
  }

  this.stop = function () {
    if (this.started) {
      this.started = false;
      ecoule = + new Date() - debut;
    }
    return ecoule;
  }

  this.pause = function () {
    if (!this.paused) {
      this.paused = true;
      ecoule = + new Date() - debut;

    }
    return ecoule;
  };

  this.resume = function () {
    if (this.paused) {
      this.paused = false;
      debut = + new Date() - ecoule;

    }


  };

  this.read = function () {
    if (!this.started || this.paused) {
      return ecoule;
    }
    return + new Date() - debut;
  }

}


class Chrono {


  constructor() {
    this.paused = false
    this.started = false
    this.debut = 0
    this.ecoule = 0
  }



  start() {

    if (!this.started) {
      this.paused = false;
      this.started = true;
      this.debut = + new Date();
      this.ecoule = 0;
    }
  }

  stop() {
    if (this.started) {
      this.started = false;
      this.ecoule = + new Date() - this.debut;
    }
    return this.ecoule;
  }

  pause() {
    if (!this.paused) {
      this.paused = true;
      this.ecoule = + new Date() - this.debut;

    }
    return this.ecoule;
  };

  resume() {
    if (this.paused) {
      this.paused = false;
      this.debut = + new Date() - this.ecoule;

    }


  };

  get now() {
    return this.read();
  }


  read() {
    if (!this.started || this.paused) {
      return this.ecoule;
    }
    return + new Date() - this.debut;
  }

}

let timerTwo = new Chrono();



function pauseTimer() {
  pause.onclick = function () {
    pause.style.display = 'none';
    resume.style.display = 'block';
    timerTwo.pause();
  }
  resume.onclick = function () {
    resume.style.display = 'none';
    pause.style.display = 'block';
    timerTwo.resume();
  }
}


function winCondition() {
  if (scoring === 3 && easyWin === true) {
    won.style.display = 'flex';
  } if (scoring === 6 && mediumWin === true) {
    won.style.display = 'flex';
  } if (scoring === 9 && hardWin === true) {
    won.style.display = 'flex';
  } if (scoring === 12 && mastermindWin === true) {
    won.style.display = 'flex';
  }

  stopTimer();

}

let interval;


function stopTimer() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

function decrementOneSecond() {
  stopTimer();


  timerTwo.stop();
  timerTwo.start();

  interval = setInterval(() => {

    let
      ecoule = Math.floor(timerTwo.read() / 1000),
      restant = time - ecoule;



    timer.innerText = `Timer : ${restant}`;



    if (restant < 0) {
      stopTimer();
      frontPage.classList.remove('front-page');
      lost.style.display = 'flex';
    }
  }, 500);

  console.log(interval);
}

function changeOpacity(element) {
  element.style.opacity = 0;
}

// function shuffle() {
//   cards.forEach(card => {
//     randomIndex = Math.random(Math.floor()* 12);
//     card.style.order = randomIndex;
//   })
// }

function flipCard() {
  if (lockBoard) return;
  // Check if the this is actually the cards : //
  if (this === firstCard) return;
  this.classList.toggle('flip');
  // Reversed logic. If cardFlipped is true // 
  if (!cardFlipped) {
    cardFlipped = true;
    firstCard = this;
  } else {
    cardFlipped = false;
    secondCard = this;
    ifMatch();
    winCondition();
    // BEWARE to set the data-attribute on the card, and not on the image !!! //
    // If the player is to swift he can unravel too many cards at once ! //
  }
}

function scoringHandler() {
  if (firstCard.dataset.id === secondCard.dataset.id) {
    // scoreDisplay.innerHTML = 'Score : ' + (scoring += 1);
    scoreDisplay.innerHTML = `Score : ${scoring += 1}`;
    // flipsCount.innerHTML = flips++;
  }
}

// Evaluer une condition de victoire si TOUTES les cartes sont retournées;
function winConditionEasy() {
  if (scoring === 3) {
    allGames.style.display = 'none';
    buttonClicked = false;

  }
}

function flipsHandler() {
  if (firstCard.dataset.id !== secondCard.dataset.id) {
    flipsCount.innerHTML = flips++;
  }
  else if (firstCard.dataset.id === secondCard.dataset.id) {
    flipsCount.innerHTML = flips++;
  }
  console.log(flips);
  //   }if (firstCard.dataset.id !== secondCard.dataset.id) {
  // flipsCount.innerHTML = flips++;
  //   }

}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockBoard = false;
  }, 1000);
  flipsHandler();
}

function ifMatch() {

  // Si les cartes sont les mêmes, le score et le flip sont incrémentés de 1, les cartes sont désactivées et l'opacité passe à 1
  if (firstCard.dataset.id === secondCard.dataset.id) {
    scoringHandler();
    flipsHandler();
    disableCards();
    changeOpacity(firstCard);
    changeOpacity(secondCard);
  }
  else {
    unflipCards();
  }
}

pauseTimer();



////////////////////                  BUTTONS REACTION                          ///////////////////

easyB.onclick = function () {
  easyWin = true;
  easyGame.classList.toggle('easy-game-active');
  buttonClicked = true;


  decrementOneSecond();
  cards.forEach(card => card.addEventListener('click', flipCard, winConditionEasy));
  if (buttonClicked === true) {
    buttons.forEach(item => item.style.display = 'none');
  } if (buttonClicked === false) {
    buttons.forEach(item => item.style.display = 'none')
  }
}

mediumB.onclick = function () {
  mediumWin = true;
  mediumGame.classList.toggle('medium-game-active');
  buttonClicked = true;
  decrementOneSecond();
  buttonClicked ? buttons.forEach(item => item.style.display = 'none') : console.log('test');
  // if (buttonClicked === true) {
  //     buttons.forEach(item => item.style.display = 'none');
  // }
}

hardB.onclick = function () {
  hardWin = true;
  hardGame.classList.toggle('hard-game-active');
  buttonClicked = true;
  decrementOneSecond();
  if (buttonClicked === true) {
    buttons.forEach(item => item.style.display = 'none');
  }
}

mastermindB.onclick = function () {
  mastermindWin = true;
  mastermindGame.classList.toggle('mastermind-game-active');
  buttonClicked = true;
  decrementOneSecond();
  if (buttonClicked === true) {
    buttons.forEach(item => item.style.display = 'none');
  }
}



//                                    CODE                                       //////////////////

cards.forEach(card => card.addEventListener('click', flipCard));
