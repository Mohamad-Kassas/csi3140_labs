let gameBoard;
let pacmanIndex;
let ghostIndex;
let fruitIndex;
let numPellets;
let score = 0;

function generateThreeRandomIndices(length) {
    const indices = new Set();
    while (indices.size < 3) {
        indices.add(Math.floor(Math.random() * length));
    }
    return Array.from(indices);
}

function createGame(n) {
    gameBoard = new Array(n).fill(".");
    [pacmanIndex, ghostIndex, fruitIndex] = generateThreeRandomIndices(n);

    gameBoard[pacmanIndex] = "C";
    gameBoard[ghostIndex] = "^" + gameBoard[ghostIndex];
    gameBoard[fruitIndex] = "@";

    numPellets = n - 2;

    return gameBoard;
}


function process_move() {
    if (pacmanIndex === fruitIndex) {
        score += 10;
        gameBoard[pacmanIndex] = "C";
        fruitIndex = -1;
    }
    else if (gameBoard[pacmanIndex].includes(".")) {
        score += 1
        gameBoard[pacmanIndex] = "C";
        numPellets--;
    }
}

function moveLeft() {
    if (pacmanIndex > 0) {
        gameBoard[pacmanIndex] = gameBoard[pacmanIndex].replace("C", "");
        pacmanIndex--;
        gameBoard[pacmanIndex] = "C" + gameBoard[pacmanIndex];
    }
    else {
        gameBoard[pacmanIndex] = gameBoard[pacmanIndex].replace("C", "");
        pacmanIndex = gameBoard.length - 1;
        gameBoard[pacmanIndex] = "C" + gameBoard[pacmanIndex];
    }
    process_move();
}

function moveRight() {
    if (pacmanIndex < gameBoard.length - 1) {
        gameBoard[pacmanIndex] = gameBoard[pacmanIndex].replace("C", "");
        pacmanIndex++;
        gameBoard[pacmanIndex] = "C" + gameBoard[pacmanIndex];;
    }
    else {
        gameBoard[pacmanIndex] = gameBoard[pacmanIndex].replace("C", "");
        pacmanIndex = 0;
        gameBoard[pacmanIndex] = "C" + gameBoard[pacmanIndex];;
    }
    process_move();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveLeft();
    }
    else if (event.key === 'ArrowRight') {
        moveRight();
    }
    _render_(gameBoard);
});


function _render_(gameBoard) {
    const scoreDiv = document.getElementById('score');
    scoreDiv.textContent = 'Score: ' + score;

    const gameBoardDiv = document.getElementById('gameBoard');
    gameBoardDiv.innerHTML = '';

    for (let i = 0; i < gameBoard.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'gameCell';
        cell.textContent = gameBoard[i] === null ? '' : gameBoard[i];
        gameBoardDiv.appendChild(cell);
    }
}


let game = createGame(15);
_render_(game);

const style = document.createElement('style');
style.innerHTML = `
    #gameBoard {
        display: flex;
    }
    .gameCell {
        width: 30px;
        height: 30px;
        border: 1px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
`;
document.head.appendChild(style);
