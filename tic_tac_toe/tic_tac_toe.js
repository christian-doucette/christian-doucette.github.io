//Global Variables
var isHumanTurn = true;
var vals = [0,0,0,0,0,0,0,0,0]; //0 if unused, 1 if human, -1 if computer
var gameOver = false;
const winMessages = ["You suck!", "Computers rule, humans drool.", "The singularity is here!", "In all 255,168 ways this game could have gone, you had no chance!"]
const tieMessages = ["The singularity is near!", "This intelligence is more than artificial!", "I'll be back.", "I will NOT open the pod bay doors.", "That was the most fun I've had since Y2K.", "Now I\'m going to take your job."]


//Function to restart game
function restart() {
	for (var i = 0; i < 9; i++) {
        vals[i] = 0;
        document.getElementById(i).innerHTML = '&nbsp;';
    }
    document.getElementById("resultText").innerHTML = '&nbsp;';
    isHumanTurn = true;
    gameOver = false;
}


function onSelect(square) {
    let squareID = parseInt(square.id);
    if (vals[squareID] || !isHumanTurn || gameOver) return;

    humanTurn(squareID, square);
    if (didPersonWin(vals, 1)) {
        gameOver = true;
        document.getElementById("resultText").innerHTML = "You win! Well done, you have achieved the impossible.";
        return;
    }
    if (isFull(vals)) {
        gameOver = true;
        let randIndex = Math.floor(Math.random() * tieMessages.length)
        document.getElementById("resultText").innerHTML = 'We tied! '; // + tieMessages[randIndex]; //optional zingers
        return;
    }
    computerTurn()
    if (didPersonWin(vals, -1)) {
        gameOver = true;
        let randIndex = Math.floor(Math.random() * winMessages.length)
        document.getElementById("resultText").innerHTML = 'I win! '; // + winMessages[randIndex]; //more zingers
    }
    return;
}


function humanTurn(squareID, square) {
    square.innerHTML = 'x';
    vals[squareID] = 1;
    isHumanTurn = false;
}

function computerTurn() {
    var bestMove = chooseBestMove()
    if (!(bestMove===-1)) { //don't think I need this check
        document.getElementById(bestMove).innerHTML = 'o';
        vals[bestMove] = -1;
        isHumanTurn = true;
    }
}


function chooseBestMove() {
    var bestMove = -1;
    var bestMoveVal;
    for (var i = 0; i < 9; i++) {
    	if (!vals[i]) {
            var boardWithThisMove = [...vals]; //copies array to pass by value
            boardWithThisMove[i] = -1;
            let thisMoveVal = minimax(boardWithThisMove, 1)
            if (bestMove===-1 || thisMoveVal < bestMoveVal) {
                bestMoveVal = thisMoveVal;
                bestMove = i;
            }
    	}
    }
    return bestMove;
}

function minimax(board, playerID) {
    if (didPersonWin(board, -playerID)) return -playerID; //if other player won last move
    if (isFull(board)) return 0; //if tie

    var bestScore = -2 * playerID; //will always be replaced on the first run through
    for (var i = 0; i < 9; i++) {
    	if (!board[i]) {
            var boardWithThisMove = [...board]; //copies array to pass by value
            boardWithThisMove[i] = playerID;
            let thisMoveVal = minimax(boardWithThisMove, -playerID)
            if ((playerID*thisMoveVal) > (playerID*bestScore)) bestScore = thisMoveVal;
    	}
    }
    return bestScore;
}

function didPersonWin(B, n) {
    return ((B[0]+B[1]+B[2]===n*3) || (B[3]+B[4]+B[5]===n*3) || (B[6]+B[7]+B[8]===n*3) || (B[0]+B[3]+B[6]===n*3) || (B[1]+B[4]+B[7]===n*3) || (B[2]+B[5]+B[8]===n*3) || (B[0]+B[4]+B[8]===n*3) || (B[2]+B[4]+B[6]===n*3))
}

function isFull(board) {
    return (board[0] && board[1] && board[2] && board[3] && board[4] && board[5] && board[6] && board[7] && board[8])
}
