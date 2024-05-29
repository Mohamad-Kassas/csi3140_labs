function generateThreeRandomIndices(length) {
    const indices = new Set();
    while (indices.size < 3) {
        indices.add(Math.floor(Math.random() * length));
    }
    return Array.from(indices);
}

function createGame(n) {
    let gameBoard = new Array(n).fill(".");
    let [index1, index2, index3] = generateThreeRandomIndices(n);

    gameBoard[index1] = "C";
    gameBoard[index2] = "@";
    gameBoard[index3] = "^" + gameBoard[index3];

    return gameBoard;
}


function _render_(gameBoard) {
    const gameBoardDiv = document.getElementById('gameBoard');
    gameBoardDiv.innerHTML = '';

    for (let i = 0; i < gameBoard.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'gameCell';
        cell.textContent = gameBoard[i] === null ? '' : gameBoard[i];
        gameBoardDiv.appendChild(cell);
    }
}

// Example usage:
let game = createGame(15);
_render_(game);

// CSS to style the game cells (optional)
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
