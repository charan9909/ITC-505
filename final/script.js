const boardSize = 5;
const board = [];

function toggle(x, y) {
  if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
    board[x][y].classList.toggle('is-off');
  }
}

function handleClick(x, y) {
  toggle(x, y);
  toggle(x - 1, y);
  toggle(x + 1, y);
  toggle(x, y - 1);
  toggle(x, y + 1);

  checkWin();
}

function checkWin() {
  const allOff = board.flat().every(cell => cell.classList.contains('is-off'));
  if (allOff) {
    alert('You win!');
  }
}

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const div = document.createElement('div');
      div.classList.add('square', 'is-off');
      div.addEventListener('click', () => handleClick(x, y));
      gameBoard.appendChild(div);
      row.push(div);
    }
    board.push(row);
  }

  // Create a random solvable state by simulating random clicks
  for (let i = 0; i < 10; i++) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);
    handleClick(x, y); // Use handleClick to preserve solvability
  }
}

createBoard();
