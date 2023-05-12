let easyB = document.querySelector('.easy-btn');
let buttons = document.querySelectorAll('button');
let mediumB = document.querySelector('.easy-btn');
let hardB = document.querySelector('.easy-btn');
let mastermindB = document.querySelector('.easy-b');
let easyGame = document.querySelector('.easy-game');
let mediumGame = document.querySelector('.medium-game');
let hardGame = document.querySelector('.hard-game');
let mastermindGame = document.querySelector('.mastermind-game');
buttonClicked = false;

easyB.onclick = function() {
    easyGame.classList.toggle('easy-game-active');
    buttonClicked = true;
    if (buttonClicked === true) {
        buttons.forEach(item => item.style.display = 'none');
    }
}