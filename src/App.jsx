import { useState } from "react"
import Log from "./components/Log"
import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import {WINNING_COMBINATIONS} from './winning-combinations'
import GameOver from './components/GameOver'

const PLAYERS = {
  X:'Player 1',
  O:'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns){

  let currPlayer ='X'
  
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currPlayer = 'O'
  }
  return currPlayer
}

function deriveWinner(gameBoard,players){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol ){
     winner = players[firstSquareSymbol]
    }
  } 
  return winner
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])] // this is called creating deep copy of array or obj
  for (const turn of gameTurns) {
      const { square, player } = turn
      const { row, col } = square
      gameBoard[row][col] = player
  }
  return gameBoard
}

function App() {
    const [players,setPlayers] = useState({
      X:'Player 1',
      O:'Player 2'
    })
    
    const [gameTurns, setGameTurns] = useState([])

    const activePlayer = deriveActivePlayer(gameTurns)
    const gameBoard = deriveGameBoard(gameTurns)
    const winner = deriveWinner(gameBoard,players)
    const hasDraw = gameTurns.length === 9 &&  !winner
    



    function handleSelectSquare(rowIndex,colIndex){
      
      setGameTurns(prevTurns =>{
        const currPlayer = deriveActivePlayer(gameTurns)
        const updatedTurns = [
          {square:{row:rowIndex,col:colIndex},player:currPlayer},...prevTurns]
        return updatedTurns
      })
    }
    
    function handleRestart(){
      setGameTurns([])
    }
    
    function handlePlayerNameChange(symbol,newName){
      setPlayers(prevPlayers=>{
        return {
          ...prevPlayers,
          [symbol]:newName
        }
      })
    }
return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
       <Player name={PLAYERS.X} onChangeName={handlePlayerNameChange} symbol="X" isActive={activePlayer === 'X'}/>
       <Player name={PLAYERS.O} onChangeName={handlePlayerNameChange} symbol="O" isActive={activePlayer === 'O'}/>
      </ol>
      {(winner || hasDraw)&& <GameOver onRestart={handleRestart}  winner={winner}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
  </main>
}

export default App
