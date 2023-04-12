import React from "react";
import {useState} from 'react'

import "./Game.css";
import control from "./control";
function Game() {

     // to store a modified version of passage which is converted into jsx.

     const [converted, setConverted] = useState([]);
     const [wpm, setWpm] = useState(0);

    control(setConverted, setWpm)
    return (
        <div className="maingame">
            <div className="instr">
                Instructions: <br />
                Type the words or sentences that appear on the screen as quickly
                and accurately as possible. You can use either a keyboard or a
                mobile device to play the game. The game ends when you reach the
                time limit or make too many mistakes.
            </div>
            <div className="wordarea">
                {converted}
                {wpm}
            </div>
        </div>
    );
}

export default Game;
