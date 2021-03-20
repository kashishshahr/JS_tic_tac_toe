const gameStatus=document.querySelector('.game-status');
let currentPlayer='X';
const resultMesage=(resultFlag)=>{return resultFlag?`Player ${currentPlayer} has won this game`:"The Game has ended in Draw"};
const currentPlayerTurn=()=>`${currentPlayer}'s Turn`;

let minMoves=4;
let noOfMoves=0;
gameStatus.textContent=currentPlayerTurn();
let gameState=["","","","","","","","",""];
//            [X,O,X,
//             O,X,O,
//             X,O,X];
let isGameActive=true;
const winningConditions=
[
       [0,1,2],
       [3,4,5],
       [6,7,8],
       [0,3,6],
       [1,4,7],
       [2,5,8],
       [0,4,8],
       [2,4,6]
];//8 winning conditions

function handleCellClicked(clickedCell,indexOfClickedCell){

gameState[indexOfClickedCell]=currentPlayer;
clickedCell.textContent=currentPlayer;
clickedCell.style.backgroundColor="black";
clickedCell.style.color="white";

}

//              [0,1,2]
//              [3,4,5]
//              [6,7,8]

function evaluateResult(clickedCell){
       
       if((++noOfMoves)>minMoves)
       {
       let playerWon=false;
       for(let winningCondition of winningConditions)
       {
             // console.log(winningCondition);
             let a=gameState[winningCondition[0]];
             let b=gameState[winningCondition[1]];
             let c=gameState[winningCondition[2]];
              if(a===""|| b===""|| c==="")
                     continue;
              if(a===b && b===c)
              {
                            playerWon=true;
                            break;
              }
       }
       if(playerWon){
              gameStatus.textContent=resultMesage(playerWon);
              isGameActive=false;
              
              clickedCell.style.backgroundColor="green";
              clickedCell.style.color="white";
              
              return;
       }
       let roundDraw=!gameState.includes("");
       if(roundDraw){
              gameStatus.textContent=resultMesage(!roundDraw);
              isGameActive=false;
              
              clickedCell.style.backgroundColor="yellow";
              clickedCell.style.color="white";
              return;
       }
       }
       currentPlayer=currentPlayer==="X"?"O":"X";
       gameStatus.textContent=currentPlayerTurn();

}
function cellClicked(event){
//console.log("Cell Clicked");       

const clickedCell=event.target; 
//console.log(typeof clickedCell.getAttribute('data-index'));
const indexOfClickedCell=parseInt(clickedCell.getAttribute('data-index'));
//console.log(indexOfClickedCell);
       if(gameState[indexOfClickedCell]!=="")
       {
              console.log("Already Clicked Cell");
              return;
       }
       if(!isGameActive){
              console.log("Game is not Active");

              return;
       }
       handleCellClicked(clickedCell,indexOfClickedCell);
              evaluateResult(clickedCell);
}

function restartButtonClicked()
{
       //console.log("restart Button Clicked");
       isGameActive=true;
       currentPlayer="X";
       gameState=["","","","","","","","",""];
       gameStatus.textContent=currentPlayerTurn();
       document.querySelectorAll('.cell').forEach(cell=>{cell.textContent="";cell.style.backgroundColor="white";cell.style.color="black"});
}
document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click',cellClicked))
document.querySelector('.game-restart').addEventListener('click',restartButtonClicked);
console.log(currentPlayerTurn);
