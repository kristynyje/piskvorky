// Circle starts the game
let whoseTurn = 'circle';

// Selectors
const buttons = document.querySelectorAll('.game__grid button');

const turnIcon = document.querySelector('.icon__game');

// Function - changes the player icon and displays icon in the game grid
const turns = (event) => {
  if (event.target.classList.length === 0) {
    event.target.disabled = true;
    if (whoseTurn === 'circle') {
      whoseTurn = 'cross';
      event.target.classList.add('game__grid--circle');
      turnIcon.src = 'photos/cross.svg';
      console.log(turnIcon.src);
    } else {
      whoseTurn = 'circle';
      event.target.classList.add('game__grid--cross');
      turnIcon.src = 'photos/circle.svg';
    }
  }
};
for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', turns);
}
