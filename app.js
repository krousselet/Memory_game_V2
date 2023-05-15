let cards = document.querySelectorAll('.card')
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
let flips = document.querySelector('.flips');
let scoreDisplay = document.querySelector('.score');

// Problems I encountered :
// BEWARE to set the data-attribute on the card, and not on the image !!! //
// If the player is to swift he can unravel too many cards at once ! //
// If the player clicked two times on the same card, it disabled it //

//                                   MES FONCTIONS                               ////////////////

// function shuffle() {
//     cards.forEach(cards => {
//         let randomPos = Math.floor(Math.random() * indexRandom);
//         cards.style.order = randomPos;
//     })
// }

function flipCard() {
  if (lockBoard) return;
  // Check if the this is actually the cards : //
  console.log(this);
  if (this === firstCard) return;
  this.classList.toggle('flip');
  // Reversed logic. If cardFlipped is true // 
  if(!cardFlipped) {
    cardFlipped = true;
    firstCard = this;
  }else {
    cardFlipped = false;
    secondCard = this;
    ifMatch();
    // BEWARE to set the data-attribute on the card, and not on the image !!! //
    // If the player is to swift he can unravel too many cards at once ! //
  }
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
  },1000);
}

function ifMatch() {
  if (firstCard.dataset.id === secondCard.dataset.id) {
    disableCards();
    
      // Now, if the cards are the same, they are pinned in place //
    }else {
      unflipCards();
    }
}



////////////////////                  BUTTONS REACTION                          ///////////////////

easyB.onclick = function() {
  easyGame.classList.toggle('easy-game-active');
  buttonClicked = true;
  if (buttonClicked === true) {
      buttons.forEach(item => item.style.display = 'none');
  }
}

mediumB.onclick = function() {
  mediumGame.classList.toggle('medium-game-active');
  buttonClicked = true;
  if (buttonClicked === true) {
      buttons.forEach(item => item.style.display = 'none');
  }
}

hardB.onclick = function() {
  hardGame.classList.toggle('hard-game-active');
  buttonClicked = true;
  if (buttonClicked === true) {
      buttons.forEach(item => item.style.display = 'none');
  }
}

mastermindB.onclick = function() {
  mastermindGame.classList.toggle('mastermind-game-active');
  buttonClicked = true;
  if (buttonClicked === true) {
      buttons.forEach(item => item.style.display = 'none');
  }
}



//                                    CODE                                       //////////////////

cards.forEach( card => card.addEventListener('click', flipCard))
