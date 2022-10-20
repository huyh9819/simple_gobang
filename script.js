const WHITE_CLASS = "white";
const BLACK_CLASS = "black";
const EMPTY_CLASS = "e";

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const clearButton = document.getElementById("clearButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

let recordGrid = [];
function initRecord() {
  recordGrid = [];
  for (let i = 0; i < 15; i++) {
    recordGrid.push([]);
    for (let j = 0; j < 15; j++) {
      recordGrid[i].push(EMPTY_CLASS);
    }
  }
}

console.log(recordGrid);

let blackTurn;

initGame();

restartButton.addEventListener("click", initGame);
clearButton.addEventListener("click", initGame);

function initGame() {
  blackTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(WHITE_CLASS);
    cell.classList.remove(BLACK_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
  initRecord();
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = blackTurn ? BLACK_CLASS : WHITE_CLASS;
  placeMark(cell, currentClass);
  console.log(checkWin(currentClass, cell.id));
  if (checkWin(currentClass, cell.id)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function fillRecord(id, currClass) {
  row = parseInt(id / 15);
  col = id % 15;
  recordGrid[row][col] = currClass;
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${
      blackTurn ? "Black" : "White"
    } Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return isFull() && !checkWin(currClass, id);
}

function isFull() {
  for (let i = 0; i < recordGrid.length; i++) {
    for (let j = 0; j < recordGrid.length; j++) {
      if (recordGrid[i][j] === EMPTY_CLASS) {
        return false;
      }
    }
  }
  return true;
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  fillRecord(cell.id, currentClass);
}

function swapTurns() {
  blackTurn = !blackTurn;
}

function setBoardHoverClass() {
  board.classList.remove(WHITE_CLASS);
  board.classList.remove(BLACK_CLASS);
  if (blackTurn) {
    board.classList.add(BLACK_CLASS);
  } else {
    board.classList.add(WHITE_CLASS);
  }
}

// check the winner
function checkWin(currClass, id) {
  col = id % 15;
  row = parseInt(id / 15);
  return (
    checkRight(currClass, row, col) ||
    checkLeft(currClass, row, col) ||
    checkUp(currClass, row, col) ||
    checkDown(currClass, row, col) ||
    checkDownRight(currClass, row, col) ||
    checkUpLeft(currClass, row, col) ||
    checkDownLeft(currClass, row, col) ||
    checkUpRight(currClass, row, col)
  );
}

function checkDown(currClass, r, c) {
  let count = 1;
  while (r + count < recordGrid.length) {
    if (recordGrid[r + count][c] !== currClass) {
      return false;
    }
    count++;
    if (count == 5) {
      return true;
    }
  }
  return false;
}

function checkUp(currClass, r, c) {
  let count = 1;
  while (r - count >= 0) {
    if (recordGrid[r - count][c] !== currClass) {
      return false;
    }
    count++;
    if (count == 5) {
      return true;
    }
  }
  return false;
}

function checkRight(currClass, r, c) {
  let count = 1;
  while (c + count < recordGrid[0].length) {
    if (recordGrid[r][c + count] !== currClass) {
      return false;
    }
    count++;
    if (count == 5) {
      return true;
    }
  }
  return false;
}

function checkLeft(currClass, r, c) {
  let count = 1;
  while (c - count >= 0) {
    if (recordGrid[r][c - count] !== currClass) {
      return false;
    }
    count++;
    if (count == 5) {
      return true;
    }
  }
  return false;
}

function checkDownRight(currClass, r, c) {
  let count = 1;
  while (r - count >= 0 && c - count >= 0) {
    if (recordGrid[r - count][c - count] !== currClass) {
      return false;
    }
    count++;
    if (count == 5) {
      return true;
    }
  }
  return false;
}

function checkUpLeft(currClass, r, c) {
  let count = 1;
  while (r + count < recordGrid.length && c + count < recordGrid[0].length) {
    if (recordGrid[r + count][c + count] !== currClass) {
      return false;
    }
    count++;
    if (count == 5) {
      return true;
    }
  }
  return false;
}

function checkUpRight(currClass, r, c) {
  let count = 1;
  while (r + count < recordGrid.length && c - count >= 0) {
    if (recordGrid[r + count][c - count] !== currClass) {
      return false;
    }
    count++;
    if (count == 5) {
      return true;
    }
  }
  return false;
}

function checkDownLeft(currClass, r, c) {
  let count = 1;
  while (r - count >= 0 && c + count < recordGrid[0].length) {
    if (recordGrid[r - count][c + count] != currClass) {
      return false;
    }
    count++;
    if (count == 5) {
      return true;
    }
  }
}
