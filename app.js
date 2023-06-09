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
let music = document.querySelector('.music-off');
let track = document.querySelector('.track');
let titles = document.querySelector('.titles');
let countFlips = true;
let listing = document.querySelector('.listing')

// Problems I encountered :
// BEWARE to set the data-attribute on the card, and not on the image !!! //
// If the player is to swift he can unravel too many cards at once ! //
// If the player clicked two times on the same card, it disabled it //

//                                   MES FONCTIONS                               ////////////////

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

  if ([
    [easyWin, 3],
    [mediumWin, 6],
    [hardWin, 9],
    [mastermindWin, 12]
  ].some(item => {
    const [bool, int] = item;

    return bool === true && scoring === int;
  })) {
    won.style.display = 'flex';
    listing.innerHTML = `Félicitations !<br> Vous avez gagné en ${flips} coups,<br> et ${scoring} points !`;
    stopTimer();
  }



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



    if (restant <= 0) {
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
let cartesRetournees = [];

function flipCard() {

  console.debug(cartesRetournees);

  if (cartesRetournees.length === 2 || lockBoard) {
    return;
  }

  if (cartesRetournees.includes(this)) {
    return;
  }

  this.classList.toggle('flip');

  cartesRetournees.push(this);

  [firstCard, secondCard] = cartesRetournees;
  if (cartesRetournees.length === 2) {
    ifMatch();
    winCondition();


  }

  //if (lockBoard) return;
  // Check if the this is actually the cards : //
  // if (this === firstCard) return;
  // this.classList.toggle('flip');
  // Reversed logic. If cardFlipped is true // 
  // if (!cardFlipped) {
  //   cardFlipped = true;
  //   firstCard = this;
  // } else {
  //   cardFlipped = false;
  //   secondCard = this;
  //   ifMatch();
  //   winCondition();
  // BEWARE to set the data-attribute on the card, and not on the image !!! //
  // If the player is swift enough he can unravel too many cards at once ! //
  // }
}

function scoringHandler() {
  if (firstCard.dataset.id === secondCard.dataset.id) {
    scoreDisplay.innerHTML = `Score : ${scoring += 1}`;
  }
}

function flipsHandler() {
  if (countFlips) {
    flipsCount.innerHTML = flips++;
    console.log(timerTwo);
  }

}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  countFlips = true;
}

function unflipCards() {
  lockBoard = true;
  timerTwo.pause();
  setTimeout(() => {
    timerTwo.resume();
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    cartesRetournees = [];
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
    cartesRetournees = [];
  }
  else {
    unflipCards();
  }
}

pauseTimer();



////////////////////                  BUTTONS REACTION                          ///////////////////

easyB.onclick = function () {
  decrementOneSecond();
  easyWin = true;
  easyGame.classList.toggle('easy-game-active');
  buttonClicked = true;
  for (i = allGames.children.length; i >= 0; i--) {
    allGames.appendChild(allGames.children[Math.random() * i | 0]);
  };

  if (buttonClicked === true) {
    buttons.forEach(item => item.style.display = 'none');
  } if (buttonClicked === false) {
    buttons.forEach(item => item.style.display = 'none')
  }
};

mediumB.onclick = function () {
  mediumWin = true;
  mediumGame.classList.toggle('medium-game-active');
  buttonClicked = true;
  decrementOneSecond();
  buttonClicked ? buttons.forEach(item => item.style.display = 'none') : console.log('test');
  for (i = allGames.children.length; i >= 0; i--) {
    allGames.appendChild(allGames.children[Math.random() * i | 0]);
  }
};

hardB.onclick = function () {
  hardWin = true;
  hardGame.classList.toggle('hard-game-active');
  buttonClicked = true;
  decrementOneSecond();
  for (i = allGames.children.length; i >= 0; i--) {
    allGames.appendChild(allGames.children[Math.random() * i | 0]);
  };
  if (buttonClicked === true) {
    buttons.forEach(item => item.style.display = 'none');
  } if (buttonClicked === false) {
    buttons.forEach(item => item.style.display = 'none')
  }
};

mastermindB.onclick = function () {
  mastermindWin = true;
  mastermindGame.classList.toggle('mastermind-game-active');
  buttonClicked = true;
  decrementOneSecond();
  if (buttonClicked === true) {
    buttons.forEach(item => item.style.display = 'none');
  }
}
if (buttonClicked === true) {
  buttons.forEach(item => item.style.display = 'none');
}
for (i = allGames.children.length; i >= 0; i--) {
  allGames.appendChild(allGames.children[Math.random() * i | 0]);
};




// ***********************************************CODE**************************//////////////////

cards.forEach(card => card.addEventListener('click', flipCard));

music.onclick = function () {
  if (music.innerHTML === 'Music : Off') {
    music.innerHTML = 'Music : On';
    track.play();
  } else if (music.innerHTML === 'Music : On') {
    music.innerHTML = 'Music : Off';
    track.pause();
  }
}

buttons.forEach(el => el.addEventListener('click', function () { titles.style.display = 'none'; }));