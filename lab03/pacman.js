let gameBoard;
let pacmanIndex;
let ghostIndex;
let fruitIndex;
let numPellets;
let score = 0;
let gameStatus;

function generateThreeRandomIndices(length) {
    const indices = new Set();
    while (indices.size < 3) {
        indices.add(Math.floor(Math.random() * length));
    }
    return Array.from(indices);
}

function createGame(n) {
    gameStatus = "Game is running";

    gameBoard = new Array(n).fill(".");
    [pacmanIndex, ghostIndex, fruitIndex] = generateThreeRandomIndices(n);

    gameBoard[pacmanIndex] = "C";
    gameBoard[ghostIndex] = "^" + gameBoard[ghostIndex];
    gameBoard[fruitIndex] = "@";

    numPellets = n - 2;

    return gameBoard;
}


function process_move() {
    if (pacmanIndex === ghostIndex) {
        gameBoard[pacmanIndex] = "X";
        gameStatus = "You lost!";
    }

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

    if (numPellets === 0) {
        gameStatus = "You won!";
    }

    if (gameStatus === "You won!" || gameStatus === "You lost!") {
        document.removeEventListener('keydown', keydownHandler);
        clearInterval(interval);
    }
}

function moveLeft(index, character) {
    if (index > 0) {
        gameBoard[index] = gameBoard[index].replace(character, "");
        index--;
        gameBoard[index] = character + gameBoard[index];
    }
    else {
        gameBoard[index] = gameBoard[index].replace(character, "");
        index = gameBoard.length - 1;
        gameBoard[index] = character + gameBoard[index];
    }

    return index;
}

function moveRight(index, character) {
    if (index < gameBoard.length - 1) {
        gameBoard[index] = gameBoard[index].replace(character, "");
        index++;
        gameBoard[index] = character + gameBoard[index];
    }
    else {
        gameBoard[index] = gameBoard[index].replace(character, "");
        index = 0;
        gameBoard[index] = character + gameBoard[index];
    }
    return index;
}

function moveGhost() {
    let direction = Math.random() < 0.5 ? -1 : 1;
    
    if (direction === -1) {
        ghostIndex = moveLeft(ghostIndex, "^");
    }
    else {
        ghostIndex = moveRight(ghostIndex, "^");
    }
    process_move();
    _render_(gameBoard);

}

const keydownHandler = (event) => {
    if (event.key === 'ArrowLeft') {
        pacmanIndex = moveLeft(pacmanIndex, "C");
    }
    else if (event.key === 'ArrowRight') {
        pacmanIndex = moveRight(pacmanIndex, "C");
    }

    process_move();

    _render_(gameBoard);
}

document.addEventListener('keydown', keydownHandler);


function _render_(gameBoard) {    
    const gameStatusDiv = document.getElementById('gameStatus');

    

    gameStatusDiv.textContent = gameStatus

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
let interval = setInterval(moveGhost, 2000);
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
