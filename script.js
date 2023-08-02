"use strict";

// Gameboard: displays, updates, and clears board for game module
const gameBoard = (() => {
  // 3 by 3 Board; 
  const board = ["", "", "", "", "", "", "", "", ""]

  // Load symbol at index 
  function setBoard(symbol, index){
    board[index] = symbol;
    updateBoard();
  }

  // Get symbol at index
  function getBoard(index){
    return board[index];
  }

  // Clear board
  function clearBoard(){
    for(let i = 0; i < board.length; i++){
      board[i]=[""];
    }
    updateBoard();
  }

  
  const squares = document.querySelectorAll(".square");

  // Refreshes game board display
  function updateBoard(){
    for(let i = 0; i < squares.length; i++){
      squares[i].textContent = board[i];
    }
  }

  return{getBoard, setBoard, clearBoard, updateBoard};
})();





// Updates Display Controller Text
const displayController = (()=>{
  const turnMessage = document.querySelector(".display-controller");

  function updateMessage(message){
    turnMessage.textContent = message;
  }

  return{updateMessage}
})();


// Game ran from game module
const game = (()=>{
  // Keeps track of turn order
  let turn = 1;
  let gameOver = false;

  // Player Objects for Game:
  const playerFactory = (symbol) =>{
    return{symbol};
  }
  const player1 = playerFactory("X");
  const player2 = playerFactory("O");
  
  // Returns win if win condition met
  function checkWin(sign){
    let win = false
    const winConditions = [      
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
    winConditions.forEach(element => {
      if(gameBoard.getBoard(element[0]) == sign && gameBoard.getBoard(element[1]) == sign && gameBoard.getBoard(element[2]) == sign){
        win = true;

      }
    });
    return win;
  }

  function playRound(index){
    // If game alrady over, stop.
    if(gameOver || turn >9){
      return;
    }

    // Set empty square with player symbol
    // Already preconditioned to not play 
    // round if square is not empty.
    gameBoard.setBoard(currentPlayerSymbol(), index);

    // Check if board is winning
    if(checkWin(currentPlayerSymbol())){
      gameOver = true;
      const winMessage = `Player ${currentPlayerSymbol()} Wins!`;
      displayController.updateMessage(winMessage)
      return;
    }

    // Turn 9 without win condition = tie
    if(turn == 9){
      const winMessage = `It's a tie.`;
      displayController.updateMessage(winMessage)
      gameOver = true;
      return;
    }

    // If game not over, increment turn order and update turn message.
    turn++;
    const message = `Player ${currentPlayerSymbol()}'s Turn`;
    displayController.updateMessage(message)
  }
  
  // Player clicks index
  const squares = document.querySelectorAll(".square");
  
  squares.forEach(element => {
    element.addEventListener("click", function(){
      const index = element.attributes["data-index"].value
      if(gameBoard.getBoard(index) != "" || gameOver){
        return;
      }
      playRound(index)})
  });

  // Restarts the game
  function restart(){
    turn = 1;
    gameOver = false;
    gameBoard.clearBoard();
    const message = `Player ${currentPlayerSymbol()}'s turn`;
    displayController.updateMessage
  }

  const restartBtn = document.querySelector("#restart-btn")

  restartBtn.addEventListener("click", restart)


  function currentPlayerSymbol(){
    if(turn%2 == 0){
      return player2.symbol;
    }else{
      return player1.symbol;
    }
  }


  return{};
})();

