const pvpPlay = document.querySelector(".pvp-btn")
const pvePlay = document.querySelector(".pve-btn")
const buttonsDiv = document.querySelector(".buttons")
const homeBtn = document.querySelector(".home")


const gameBoard = document.querySelector(".board")
const resetBtn = document.querySelector(".reset-btn");
const cells = document.querySelectorAll(".cell");
const playerTurn = document.getElementById("player-turn");
let turn = "X";
let board = ["", "", "", "", "", "", "", "", ""];
const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]            
];

let vsComputer = false;

function start() {
    turn = "X"
    board = ["", "", "", "", "", "", "", "", ""];
    playerTurn.textContent = `Player Turn: ${turn}`
    cells.forEach(cell => {
        cell.textContent = ""
        cell.addEventListener("click", placeSymbol)
    })
}

function placeSymbol(clicked) {
    const cell = clicked.target
    if (cell.textContent !== "") {
        return;
    }

    cell.textContent = turn
    
    const index = Array.from(cells).indexOf(cell)
    board[index] = turn

    if (hasWon(turn)) {
        playerTurn.textContent = `${turn} wins!`
        disableBoard();
        return;
    }

    if (isBoardFull()) {
        playerTurn.textContent = "Draw! Noob"
        disableBoard()
        return
    };

    turn = turn === "X" ? turn ="O" : turn="X"
    
    playerTurn.textContent = `Player Turn: ${turn}`

    if (isPve && turn === "O") {
        computerMove()
    }
}

function computerMove() {
    if (turn === "O") { 
        let availableCells = []; 

        cells.forEach((cell, index) => {
            if (board[index] === "") {
                availableCells.push(index);
            }
        });

        if (availableCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableCells.length); 
            const aiCellIndex = availableCells[randomIndex]; 

            cells[aiCellIndex].textContent = turn; 
            board[aiCellIndex] = turn; 

            if (hasWon(turn)) {
                playerTurn.textContent = `${turn} wins!`; 
                disableBoard(); 
                return; 
            }

            if (isBoardFull()) {
                playerTurn.textContent = "Draw! Noob"; 
                disableBoard(); 
                return;
            }

            turn = "X"; 
            playerTurn.textContent = `Player Turn: ${turn}`; 
        }
    }
}


function hasWon(player) {
    for (let i = 0; i < winCombinations.length; i++) {
        const combination = winCombinations[i];
        const a = combination[0];
        const b = combination[1];
        const c = combination[2];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return !board.includes("");
}

function disableBoard() {
    cells.forEach(cell => cell.removeEventListener("click", placeSymbol));  
}

pvpPlay.addEventListener("click", () => {
    buttonsDiv.style.display = "none"
    homeBtn.style.display = "block"
    resetBtn.style.display = "block"
    playerTurn.style.display = "block"
    gameBoard.style.display = "grid"
    isPve = false;
    start()
})

pvePlay.addEventListener("click", () => {
    buttonsDiv.style.display = "none"
    homeBtn.style.display = "block"
    resetBtn.style.display = "block"
    playerTurn.style.display = "block"
    gameBoard.style.display = "grid"
    isPve = true;
    start()
})

homeBtn.addEventListener("click", () => {
    buttonsDiv.style.display = "block"
    homeBtn.style.display = "none"
    resetBtn.style.display = "none"
    playerTurn.style.display = "none"
    gameBoard.style.display = "none"
})

resetBtn.addEventListener("click", start)



