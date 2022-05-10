// Circle starts the game
let whoseTurn = 'circle';

// Selectors
const buttons = document.querySelectorAll('.game__grid button');

const turnIcon = document.querySelector('.icon__game');

// Function - changes the player icon and displays icon in the game grid
const turns = (event) => {
  if (whoseTurn === 'circle') {
    whoseTurn = 'cross';
    turnIcon.src = 'photos/cross.svg';
    event.target.classList.add('game__grid--circle');
  } else {
    whoseTurn = 'circle';
    turnIcon.src = 'photos/circle.svg';
    event.target.classList.add('game__grid--cross');
  }
  event.target.disabled = true;

  // Function - Who won?
  const winner = isWinningMove(event.target);

  if (winner) {
    const symbol = getSymbol(event.target);
    if (confirm(`Vyhrává ${symbol}. Spustit novou hru?`) === true) {
      location.reload();
    }
  }

  console.log(isWinningMove(event.target));
};

for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].addEventListener('click', turns);
}

const getSymbol = (field) => {
  if (field.classList.contains('game__grid--cross')) {
    return 'KŘÍŽEK';
  } else if (field.classList.contains('game__grid--circle')) {
    return 'KOLEČKO';
  }
};

const boardSize = 10; // 10x10
const fields = document.querySelectorAll('.game__grid button');

const getField = (row, column) => {
  return fields[row * boardSize + column];
};

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }
  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};
const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // selected button
  // look to the left
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // look to the right
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }
  if (inRow >= symbolsToWin) {
    return true;
  }
  let inColumn = 1;

  // look up
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }
  // look down
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
