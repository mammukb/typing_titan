import React from 'react'
import {words} from './words'
 
import './Game.css'
function Game() {
  return (
    <div className='maingame'>
    <div className='instr'>
      Instructions: <br />
Type the words or sentences that appear on the screen as quickly and accurately as possible.
 You can use either a keyboard or a mobile device to play the game.
 The game ends when you reach the time limit or make too many mistakes.
      </div>
      <div className='wordarea'>
           
          </div>
      </div>
  )

    }
    
  


export default Game