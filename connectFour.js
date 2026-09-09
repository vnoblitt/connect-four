const board = document.getElementById('board');
const playersDiv = document.getElementById('players-div');
const gamePrompt = document.getElementById('game-prompt');
const messages = document.getElementById('messages');



/*document.addEventListener ('click', (event) => {
    if (event.target.classList.contains('slot')) console.log('slot');
    else if (event.target.classList.contains('chip')) console.log('chip');
    else console.log('nada');
});*/

gamePrompt.addEventListener('click', () => {
    const playerOneInput = document.createElement('input'); 
    const nameButton = document.createElement('button');
    const playerTwoInput = document.createElement('input');
    
    nameButton.textContent = 'Go';
    playersDiv.append(playerOneInput, nameButton, playerTwoInput);
    
    nameButton.addEventListener('click', () => {
        const PlayerOne = new Player(playerOneInput.value, 'red');
        const PlayerTwo = new Player(playerTwoInput.value, 'black');
        
        if (playerOneInput.value == '') playerOneInput.style.borderColor = 'red';
        else playerOneInput.style.borderColor = 'initial';
        
        if (playerTwoInput.value == '') playerTwoInput.style.borderColor = 'red';
        else playerTwoInput.style.borderColor = 'initial';
        
        if (playerOneInput.value != '' && playerTwoInput.value != '') {
            const playerOneDiv = document.createElement('div');
            const playerTwoDiv = document.createElement('div');
            playerOneDiv.textContent = playerOneInput.value;
            playerTwoDiv.textContent = playerTwoInput.value;

            playerOneInput.remove();
            playerTwoInput.remove();
            nameButton.remove();
            
            const playerPanel = document.createElement('div');
            playerPanel.id = 'player-panel';
            playerPanel.append(playerOneDiv, playerTwoDiv);
            document.body.append(playerPanel);

            return mainLoop(PlayerOne, PlayerTwo);
        }
    });

    gamePrompt.remove()
});

/* DEBUGGING
gamePrompt.remove();
const PlayerOne = new Player('V', 'red');
const PlayerTwo = new Player('Bobo', 'black');
mainLoop(PlayerOne, PlayerTwo)
*/

function mainLoop(PlayerOne, PlayerTwo) {
    let playing = true;
    const slots = makeSlots();
    const gameBoard = makeBoard();
    let currentPlayer = PlayerOne;
    document.addEventListener('click', (event) => {
        if(playing && slots.find(slot => slot.id === event.target.id)) {
            let selectedSlot = slots.find(slot => slot.id === event.target.id);
            if(selectedSlot.checkSpace()) {         
                let addedPiece = gameBoard.find(piece => (piece.col === selectedSlot.col) && (piece.row === 7-selectedSlot.space));
                addedPiece = dropPiece(addedPiece, currentPlayer);

                let targetDiv = document.getElementById(addedPiece.id);
                targetDiv.classList.add(currentPlayer.color);

                selectedSlot.space--;
                console.log(checkForWin(currentPlayer, gameBoard, addedPiece))
                if (checkForWin(currentPlayer, gameBoard, addedPiece)) {
                    // WIN LOGIC
                    playing = false;
                    currentPlayer.wins++;
                    messages.textContent = `${currentPlayer.name} WINS THE GAME`;
                    //resetGame(PlayerOne, PlayerTwo);
                } else {
                    currentPlayer = passTurn(PlayerOne, PlayerTwo, currentPlayer);
                }
            }
        } else {
            console.log('not slot'); 
            let x = gameBoard.find(piece => piece.id === event.target.id);
            console.log(x)
        }
    });
}

function resetGame(PlayerOne, PlayerTwo) {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'RESTART';
    messages.append(resetButton);

    resetButton.addEventListener('click', () => {
        board.innerHTML = '';
        messages.remove();
        mainLoop(PlayerOne, PlayerTwo);

    });

}

// ??? --------------------------------------------------
function GameController(players, turn) {
    this.players = players;
    this.turn = turn;
}
// ------------------------------------------------------

function Player(name, color) {
    this.name = name;
    this.color = color;
    this.wins = 0;
}

function Piece(player, color, col, row, id, index) {
    this.player = player;
    this.color = color;   
    this.col = col;
    this.row = row;
    this.id = id;
    this.index = index;
}

function Slot(col) {
    this.col = col;
    this.space = 6;
    this.id = `s${col}`;
    this.checkSpace = function(col) {
        return this.space > 0;
    }
}

function createPiece(player, color, col, row, id) {
    return { player, color, col, row, id };
}

function makeBoard() {
    let gameBoard = []
    let index = 0;
    for (let row = 6; row > 0; row--) {
        for (let col = 0; col < 7; col++) {
            let div = document.createElement('div');
            div.classList.add('chip')
            div.id = `c${col}r${row}`;
            board.append(div);
            let newPiece = new Piece('blank', 'blank', col, row, div.id, index);
            index++;
            gameBoard.push(newPiece);
        }
    }
    return gameBoard;
}

function makeSlots() {
    let slots = [];
    for (let i = 0; i < 7; i++) {
        let div = document.createElement('div');
        div.classList.add('slot')
        div.id = `s${i}`;
        board.append(div);
        let newSlot = new Slot(i);
        slots.push(newSlot);
    }
    return slots;
} 

function dropPiece(Piece, Player) {
    Piece.player = Player.name;
    Piece.color = Player.color
    return Piece;
}

function passTurn(PlayerOne, PlayerTwo, currentPlayer) {
    if (currentPlayer === PlayerOne) currentPlayer = PlayerTwo;
    else if (currentPlayer === PlayerTwo) currentPlayer = PlayerOne;
    else console.log("it is neither player's turn.");
    return currentPlayer;
}

function checkForWin(currentPlayer, gameBoard, addedPiece) {
    if(checkRow(currentPlayer, gameBoard)) {
        return true
    } else if (checkCol(currentPlayer, gameBoard)) {
        return true;
    } else if (checkDiagForward(currentPlayer, gameBoard)) {
        return true;
    } else if (checkDiagBackward(currentPlayer, gameBoard)) {
        return true;
    } else return false;
}

function checkRow(currentPlayer, gameBoard) {
    let index = 0;
    for (let i = 6; i > 0; i--) {
        let count = 0;
        for (let j = 0; j < 7; j++) {
            if (gameBoard[index].player == currentPlayer.name) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
            index++;
        }
    } return false;
}

function checkCol(currentPlayer, gameBoard) {
    let index = 0;
    for (let j = 0; j < 7; j++) {
        let count = 0;
        index = j;
         for (let i = 6; i > 0; i--) {
           //console.log(`r${i}c${j} : r${gameBoard[index].row}c${gameBoard[index].col}id${gameBoard[index].id}`)
            if (gameBoard[index].player === currentPlayer.name) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
            index += 7;
        }
    } return false;
}

/* Still too complex
function recursiveDiagForward(count, index, gameBoard, currentPlayer) {
    if (gameBoard[index].player === currentPlayer.name) {
        count += 1;
        if (index - 8 >= 0) {
            count += recursiveDiagForward(count, index, gameBoard, currentPlayer);
        } 
    } return count;
}
*/
function checkDiagForward(currentPlayer, gameBoard) {
    let index = 35;

    while (index-18 > 0) {
        if (gameBoard[index].player === currentPlayer.name 
            && gameBoard[index-6].player === currentPlayer.name 
            && gameBoard[index-12].player === currentPlayer.name
            && gameBoard[index-18].player === currentPlayer.name) {
            return true; 
        } 
        index--;
    }
    return false; 
}

function checkDiagBackward(currentPlayer, gameBoard) {
    let index = 41;

    while (index-24 > 0) {
        if (gameBoard[index].player === currentPlayer.name 
            && gameBoard[index-8].player === currentPlayer.name 
            && gameBoard[index-16].player === currentPlayer.name
            && gameBoard[index-24].player === currentPlayer.name) {
            return true; 
        } 
        index--;
    }
    return false; 
}


    
    /* This is me attempting to figure out a logical way
    of searching diagonally before giving up and going 
    idiot mode.

    let index = addedPiece.index;
    let count = 1;
    console.log(addedPiece.index)
    if (index > 38) {
        return false
    } else if (index < 3) {
        return false
    } else {
        while (index > 0) {
            if (gameBoard[index-8].player === currentPlayer.name) {
                count += 1;
                index -= 8;
            } 
        }
    }
    for (let i = 6; i > 0; i--) {
        let count = 0;
        for (let j = 0; j < 7; j++) {

        }
    }*/