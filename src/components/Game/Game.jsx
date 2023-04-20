/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { words } from "./words";
import "./Game.css";

function Game() {
    // Remove isFirstKeyDown from local storage on refresh
    window.onbeforeunload = function () {
        localStorage.removeItem("isFirstKeyDown");
        localStorage.removeItem("totalCorrectLetterCount");
        localStorage.removeItem("typed");
        localStorage.removeItem("accuracy");
    };

    // Set up state variables
    const [convertedPassage, setConvertedPassage] = useState([]);
    const [wpm, setWpm] = useState(0);
    const [passage, setPassage] = useState("");
    const [totalTime, setTotalTime] = useState(0);
    const [remainingTime, setRemainingTime] = useState(90);
    const [won, setWon] = useState(false);
    const [accuracy, setAccuracy] = useState(100);
    const [averageAccuracy, setAverageAccuracy] = useState(100);
    const [timer, setTimer] = useState(undefined);
    const [wordCount, setWordCount] = useState(1);
    const [usedWords, setUsedWords] = useState([]);
    const [totalLetterCount, setTotalLetterCount] = useState(0);
    const [correctLetters, setCorrectLetters] = useState(0);

    useEffect(() => {
        if (
            correctLetters === totalLetterCount &&
            (correctLetters !== 0 || totalLetterCount !== 0)
        ) {
            setWon(true);
        }
    }, [correctLetters, totalLetterCount]);

    useEffect(() => {
        setTotalLetterCount(totalLetterCount + passage.length);
    }, [passage]);

    useEffect(() => {
        let totalCorrectLetterCount =
            JSON.parse(localStorage.getItem("totalCorrectLetterCount")) ?? 0;
        let time = 0;
        let isFirstKeyDown =
            JSON.parse(localStorage.getItem("isFirstKeyDown")) ?? true;
        let correctLetterCount = 0;
        let accuracy = 0;

        // Convert passage string to JSX format
        const passageArray = passage.split(" ");
        const jsxArray = [];
        let index = 0;
        passageArray.forEach((word) => {
            const wordArray = word.split("");
            const wordJSXArray = [];
            wordArray.forEach((letter) => {
                const id = `passage_${index}`;
                const jsx = (
                    <p key={id} id={id}>
                        {letter}
                    </p>
                );
                wordJSXArray.push(jsx);
                index++;
            });
            const wordJSX = (
                <div key={`word_${index}`} className="passage">
                    {wordJSXArray}
                </div>
            );
            jsxArray.push(wordJSX);
            const spaceJSX = <p key={`space_${index}`}>&nbsp;</p>;
            jsxArray.push(spaceJSX);
            index++;
        });
        setConvertedPassage(jsxArray);

        // Set up event listener for key presses
        let count = 0;

        const keyDownHandler = (e) => {
            // retreving already typed letters from localStorage
            let typed = JSON.parse(localStorage.getItem("typed")) ?? [];

            if (e.key === "Backspace") {
                count = count > 0 ? count - 1 : 0;
                if (typed[count] === passage[count]) {
                    totalCorrectLetterCount--;
                    correctLetterCount--;
                    accuracy = parseInt(
                        (correctLetterCount / 5 / (passage.length / 5)) * 100
                    );
                    setAccuracy(accuracy);
                   
                }
                typed.splice(count, 1);
                localStorage.setItem("typed", JSON.stringify(typed));
                let pTag = document.getElementById(`passage_${count}`);
                pTag.style.color = "white";
                return;
            }

            // Skip these keys
            if (
                ["Shift", "CapsLock", "Control"].includes(e.key) ||
                count >= passage.length
            ) {
                return;
            }

            // storing entered letters to localStorage
            localStorage.setItem("typed", JSON.stringify([...typed, e.key]));

            // On first keyDown, start counting time and calculate WPM
            if (isFirstKeyDown) {
                localStorage.setItem("isFirstKeyDown", "false");
                setTimer(
                    setInterval(() => {
                        time = time + 1;
                        setTotalTime(time);
                        setRemainingTime(90 - time);

                        const letterPerSec =
                            JSON.parse(
                                localStorage.getItem("totalCorrectLetterCount")
                            ) / time;

                        const secPerWord = 5 / letterPerSec;
                        const wordPerMin = parseInt(60 / secPerWord);

                        setWpm(wordPerMin);
                    }, 1000)
                );
            }
            isFirstKeyDown = false;

            // Color change on each correct and wrong letter
            const char = e.key;
            if (passage[count] !== char) {
                let pTag = document.getElementById(`passage_${count}`);
                if (passage[count] === " ") {
                    pTag.style.backgroundColor = "#f66";
                } else {
                    pTag.style.color = "#f66";
                }
            } else {
                let p_tag = document.getElementById(`passage_${count}`);
                p_tag.style.color = "rgb(6, 255, 0)";

                totalCorrectLetterCount++;
                correctLetterCount++;

                //
                localStorage.setItem(
                    "totalCorrectLetterCount",
                    totalCorrectLetterCount
                );
                accuracy = parseInt(
                    (correctLetterCount / 5 / (passage.length / 5)) * 100
                );
                setAccuracy(accuracy);
                setCorrectLetters(totalCorrectLetterCount);
            }
            count++;
            
        };

        // focus on body by default(to start typing without clicking on the page).
        document.body.focus();

        // calling keyDownHandler (named function) on keydown
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
            setConvertedPassage(null);
            localStorage.removeItem("typed");
            let accuracyArray = JSON.parse(localStorage.getItem('accuracy')) ?? [];
            localStorage.setItem("accuracy",JSON.stringify([...accuracyArray, accuracy]))
        };
    }, [passage, passage.length]);

    useEffect(() => {
        try {
            for (let index = 0; index < passage.length; index++) {
                document.getElementById(`passage_${index}`).style.color =
                    "white";
            }
        } catch (error) {}
    }, [convertedPassage]);

    function changePassage(callback) {
        let index = null;

        do {
            index = Math.floor(Math.random() * (words.length - 1));
        } while (usedWords.includes(index));

        setPassage(words[index]);
        setUsedWords([...usedWords, index]);
        setWordCount(wordCount + 1);
    }

    function computeAccuracy() {
        let accuracyValues = JSON.parse(localStorage.getItem('accuracy')) ?? []
        const sum = accuracyValues.reduce((total, value) => total + value);
        const average = sum / accuracyValues.length;
        setAverageAccuracy(average)
    }

    useEffect(() => {
        if (won) {
            if (wordCount <= 10) {
                changePassage(() => {
                    setTotalLetterCount();
                });
                setWon(false);
            } else {
                clearInterval(timer);
                computeAccuracy();
                setWon(true);
            }
        }
    }, [won]);

    useEffect(() => {
        changePassage();
    }, []);

    useEffect(() => {
        if (remainingTime <= 0) {
            clearInterval(timer);
            computeAccuracy()
        }
    }, [remainingTime]);

    return (
        <div className="main-game">
            <div className="instructions">
                <h2>Instructions:</h2>
                <p>
                    Type the words or sentences that appear on the screen as
                    quickly and accurately as possible. You can use either a
                    keyboard or a mobile device to play the game. The game ends
                    when you reach the time limit. <br />
                  NB: Press any key to  start the game

                </p> <br />
                 
            </div>
            <div className="word-area">
            <div className="props">
                    <p className="values">WPM  <br /> {wpm} </p>
                    <p className="values">
                        Time   <br />{parseInt(remainingTime / 60)}:
                        {parseInt(remainingTime % 60)}
                    </p>
                    <p className="values">Accuracy  <br />{accuracy}</p>
                </div>
                <div className="passage">
                    {/* passage */}
                    {convertedPassage}
                </div>
               
            </div>



            {remainingTime === 0 ? (
                <div className="floating-text">Time's up!</div>
            ) : null}
            {won ? (
                <div className="floating-text">
                    <p>
                        You completed the passage in {parseInt(totalTime / 60)}:
                        {parseInt(totalTime % 60)} minutes
                    </p>
                    <p>WPM : {wpm}</p>
                    <p>Accuracy : {accuracy}</p>
                </div>
            ) : null}
        </div>
    );
}

export default Game;
