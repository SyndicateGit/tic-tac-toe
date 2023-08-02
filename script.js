"use strict";

// Player Objects for Game:
const playerFactory = (symbol) =>{
  return{symbol};
}
const player1 = playerFactory("X");
const player2 = playerFactory("O");

// Gameboard: displays, updates, and clears board for game module
const gameBoard = (() => {
  // 3 by 3 Board; 
  const board = ["X", "X", "O", "", "", "", "", "", ""]

  // Load symbol at index 
  function setBoard(symbol, index){
    board[index] = symbol;
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





// Updates Display Controller Text Based on Turn Order
const displayController = (()=>{

  return{}
})();


// Game ran from game module
const game = (()=>{




  return{};
})();

gameBoard.updateBoard();
