const board = document.getElementById('board');
const playersDiv = document.getElementById('players-div');
const gamePrompt = document.getElementById('game-prompt');



/*document.addEventListener ('click', (event) => {
    if (event.target.classList.contains('slot')) console.log('slot');
    else if (event.target.classList.contains('chip')) console.log('chip');
    else console.log('nada');
});*/

/* TURNED OFF FOR DEBUGGING -----------------------------------------
gamePrompt.addEventListener('click', () => {
    const playerOneInput = document.createElement('input'); 
    const nameButton = document.createElement('button');
    const playerTwoInput = document.createElement('input');
    
    nameButton.textContent = 'Go';
    playersDiv.append(playerOneInput, nameButton, playerTwoInput);
    
    nameButton.addEventListener('click', () => {
        const PlayerOne = createPlayer(playerOneInput.value, 'red');
        const PlayerTwo = createPlayer(playerTwoInput.value, 'black');
        
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
-----------------------------------------------------------*/
gamePrompt.remove();
const PlayerOne = createPlayer('V', 'red');
const PlayerTwo = createPlayer('Bobo', 'black');
mainLoop(PlayerOne, PlayerTwo)
function mainLoop(PlayerOne, PlayerTwo) {
    const slots = makeSlots();
    const gameBoard = makeBoard();
    for (let slot of slots) console.log(slot.id);
    document.addEventListener('click', (event) => {
        console.log(event.target)//.checkSpace());
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

function Piece(player, color, col, row, id) {
    this.player = player;
    this.color = color;   
    this.col = col;
    this.row = row;
    this.id = id;
}

function Slot(col) {
    this.col = col;
    this.space = 6;
    this.id = `s${col}`;
    this.checkSpace = function(col) {
        return this.space > 0;
    }
}

function createPlayer(name, color) {
    return {name, color}
}

function createPiece(player, color, col, row, id) {
    return { player, color, col, row, id };
}

function createSlot(col) {
    return { col }
}

function makePlayers() {

}

function makeBoard() {
    let gameBoard = []
    for (let row = 6; row > 0; row--) {
        for (let col = 0; col < 7; col++) {
            let div = document.createElement('div');
            div.classList.add('chip')
            div.id = `c${col}r${row}`;
            board.append(div);
            let newPiece = new Piece('blank', 'blank', col, row, div.id);
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

//const slots = makeSlots();
//const gameBoard = makeBoard();


//for (const piece of gameBoard) console.log(piece.id)