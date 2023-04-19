/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { words } from "./words";
import "./Game.css";

function Game() {
  // Remove isFirstKeyDown from local storage on refresh
  window.onbeforeunload = function() {
    localStorage.removeItem('isFirstKeyDown');
  };

  // Set up state variables
  const [convertedPassage, setConvertedPassage] = useState([]);
  const [wpm, setWpm] = useState(0);
  const [passage, setPassage] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(90);
  const [won, setWon] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(undefined);
  const [wordCount, setWordCount] = useState(1);
  const [usedWords, setUsedWords] = useState([]);

  // Check if the user has completed the current word
  function isWordCompleted(correctLetterCount, wordLength) {
    if (correctLetterCount === wordLength) {
      setWon(true);
    }
  }

  useEffect(() => {
    let correctLetterCount = 0;
    let time = 0;
    let isFirstKeyDown = JSON.parse(localStorage.getItem('isFirstKeyDown')) ?? true;

    // Convert passage string to JSX format
    const passageArray = passage.split(" ");
    const jsxArray = [];
    let index = 0;
    passageArray.forEach(word => {
      const wordArray = word.split("");
      const wordJSXArray = [];
      wordArray.forEach(letter => {
        const id = `passage_${index}`;
        const jsx = <p key={id} id={id}>{letter}</p>;
        wordJSXArray.push(jsx);
        index++;
      });
      const wordJSX = <div key={`word_${index}`} className="passage">{wordJSXArray}</div>;
      jsxArray.push(wordJSX);
      const spaceJSX = <p key={`space_${index}`}>&nbsp;</p>;
      jsxArray.push(spaceJSX);
      index++;
    });
    setConvertedPassage(jsxArray);

    // Set up event listener for key presses
    let count = 0;
    const keyDownHandler = (e) => {
      if (e.key === "Backspace") {
        count = count > 0 ? count - 1 : 0;
        let pTag = document.getElementById(`passage_${count}`);
        pTag.style.color = "white";
        return;
      }

      // Skip these keys
      if (["Shift", "CapsLock", "Control"].includes(e.key) || count >= passage.length) {
        return;
      }

      // On first keyDown, start counting time and calculate WPM
      if (isFirstKeyDown) {
        localStorage.setItem('isFirstKeyDown', 'false');
        setTimer(setInterval(() => {
          time = time + 1;
          setTotalTime(time);
          setRemainingTime(90 - time);

          const letterPerSec = correctLetterCount / time;
          const secPerWord = 5 / letterPerSec;
          const wordPerMin = parseInt(60 / secPerWord);
          setWpm(wordPerMin);
        }, 1000));
      }
      isFirstKeyDown = false;

      // Color change on each correct and wrong letter
      const char = e.key;
      if (passage[count] !== char) {
        let pTag = document.getElementById(`passage_${count}`);

            
            // color change on each correct and wrong letter.

           
                if (passage[count] === " ") {
                    pTag.style.backgroundColor = "#f66";
                } else {
                    pTag.style.color = "#f66";
                }
            } else {
                let p_tag = document.getElementById(`passage_${count}`);
                p_tag.style.color = "rgb(163, 238, 175)";
                correctLetterCount++;
                isWordCompleted(correctLetterCount, passage.length);
            }
            count++;
            setAccuracy(
                parseInt((correctLetterCount / 5 / (passage.length / 5)) * 100)
            );
        };

        // focus on body by default(to start typing without clicking on the page).

        document.body.focus();

        // calling keyDownHandler (named function) on keydown

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
            setConvertedPassage(null);
            console.log("unmounted");
        };
    }, [passage, passage.length]);

    useEffect(() => {
        try {
            for (let index = 0; index < passage.length; index++) {
                console.log("index", index);
                document.getElementById(`passage_${index}`).style.color =
                    "white";
            }
        } catch (error) {}
    }, [convertedPassage]);

    function changePassage() {
        console.log("usedWords: ", usedWords);

        let index = null;
        do {
            index = (Math.floor(Math.random() * (words.length-1)));
        } while (index in usedWords);
        setPassage(words[index]);
        setUsedWords([...usedWords, index]);
        setWordCount(wordCount + 1);
    }

    useEffect(() => {
        if (won) {
            
            if (wordCount <= 10) {
                changePassage();
                setWon(false);
            }
            else
            {
                clearInterval(timer);
            }
        }
    }, [won]);

    useEffect(() => {
        changePassage();
    }, []);

    useEffect(() => {
        if (remainingTime <= 0) {
            clearInterval(timer);
        }
    }, [remainingTime]);

    return (
        <div className="main-game">
        <div className="instructions">
          <h2>Instructions:</h2>
          <p>
            Type the words or sentences that appear on the screen as quickly and accurately as possible.
            You can use either a keyboard or a mobile device to play the game.
            The game ends when you reach the time limit or make too many mistakes.
          </p>
        </div>
        <div className="word-area">
          <div className="passage">
            {/* passage */}
            {convertedPassage}
          </div>
          <div className="game-stats">
            <p>WPM : {wpm}</p>
            <p>Time : {parseInt(remainingTime / 60)}:{parseInt(remainingTime % 60)}</p>
            <p>Accuracy : {accuracy}</p>
          </div>
        </div>
        {remainingTime === 0 ? (
          <div className="floating-text">Time's up!</div>
        ) : null}
        {won ? (
          <div className="floating-text">
            <p>You completed the passage in {parseInt(totalTime / 60)}:{parseInt(totalTime % 60)} minutes</p>
            <p>WPM : {wpm}</p>
            <p>Accuracy : {accuracy}</p>
          </div>
        ) : null}
      </div>
    );
}

export default Game;
