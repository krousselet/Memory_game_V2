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
buttonClicked = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//                                  MES FONCTIONS                               ////////////////

function shuffle() {
    cards.forEach(cards => {
        let randomPos = Math.floor(Math.random() * indexRandom);
        card.style.order = randomPos;
    })
}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}  

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.reomove('flip');
        secondCard.classList.reomove('flip');
        resetBoard();
        }, 1500);
}


function checkForMatch() {
    if (firstCard.dataset.id === secondCard.dataset.id) {
        disableCards();
        return;
    }

    unflipCards();
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function shuffle() {
    cards.forEach(cards => {
        let randomPos = Math.floor(Math.random() * indexRandom);
        card.style.order = randomPos;
    })
}

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