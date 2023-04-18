import { words } from "./words";
import { useState, useEffect } from "react";
import "./Game.css";

function Game() {
    // to store a modified version of passage which is converted into jsx.
    const [converted, setConverted] = useState([]);
    const [wpm, setWpm] = useState(0);

    // to store current passage.
    const [passage, setPassage] = useState("");

    /* if passage = "abc g"
            converted[0] = <div>
                            <p>a</p>
                            <p>b</p>
                            <p>c</p>
                        </div>
            converted[1] = <p>&nbsp;</p>
            converted[2] = <div><p>g</p></div>
    */

    const [totalTime, setTotalTime] = useState(0);
    const [remainingTime, setremainingTime] = useState(90);
    const [won, setwon] = useState(false);

    // to check if the user has completed the current word.
    function isWon(correctLetterCount, wordLength) {
        if (correctLetterCount === wordLength) {
            console.log(correctLetterCount, " : ", wordLength);
            setwon(true);
        }
    }

    const [accuracy, setaccuracy] = useState(100);
    const [timer, settimer] = useState(undefined);

    useEffect(() => {
        try {
            for (let index = 0; index < passage.length; index++) {
                console.log("index", index);
                document.getElementById(`passage_${index}`).style.color =
                    "white";
            }
        } catch (error) {}
    }, [converted]);

    useEffect(() => {
        console.log("mounted");

        let correctLetterCount = 0,
            time = 0;

        // converting passage into jsx (<div><p>single letter</p></div>) format.

        let convertedPassage = []; // array to store modified passage.

        let temp = []; // to store each letter of a word, which is in a p tag.

        let wordIndex = 0; // to track where to insert next word.

        // iterating through each letter of the passage

        for (let index = 0; index < passage.length; index++) {
            let letter = passage[index];

            // if letter is not a space insert it make a p tag with it

            if (letter !== " ") {
                temp[index] = (
                    <p key={`passage_${index}`} id={`passage_${index}`}>
                        {letter}
                    </p>
                );
            } else {
                // if space, insert all the p tag to a div and store it in convertedPassage.

                convertedPassage[wordIndex++] = (
                    <div key={`word_${wordIndex}`} className="passage">
                        {temp}
                    </div>
                );

                // add space after each word

                convertedPassage[wordIndex++] = (
                    <p key={`passage_${index}`} id={`passage_${index}`}>
                        &nbsp;
                    </p>
                );
                document.getElementById(
                    `passage_${index}`
                ).style.backgroundColor = "transparent";

                // clearing contents of temp.

                temp = [];
            }
        }

        // inserting last word into convertedPassage, since there is no space after the last word.

        convertedPassage[wordIndex] = (
            <div key={`word_${wordIndex}`} className="d-flex passage">
                {temp}
            </div>
        );

        setConverted(convertedPassage);

        let firstKeyDown = true;
        let count = 0;
        const keyDownHandler = (e) => {
            if (e.key === "Backspace") {
                count = count > 0 ? count - 1 : 0;
                let p_tag = document.getElementById(`passage_${count}`);
                p_tag.style.color = "white";
                return;
            }

            // skip these keys

            if (
                e.key === "Shift" ||
                e.key === "CapsLock" ||
                e.key === "Control" ||
                count >= passage.length
            ) {
                return;
            }

            // on first keyDown start counting time in sec and calculate wpm(words per minute).

            if (firstKeyDown) {
                settimer(
                    setInterval(
                        /* this function will be called on each second */
                        () => {
                            time = time + 1;
                            setTotalTime(time);
                            setremainingTime(90 - time);

                            // letters typed per second.

                            let letterPerSec = correctLetterCount / time;

                            /* The "word" is an average of 5 characters.
                           To calculate WPM, simply take the number of words typed in a minute
                           with no typos and divide by five. For example, if you type 100 words
                           in a minute including spaces, your typing speed would be 20 WPM.
                        */

                            //    5 letters == a word

                            let secPerWord = 5 / letterPerSec;
                            let wordPerMin = parseInt(60 / secPerWord);

                            setWpm(wordPerMin);
                        },
                        1000 // 1000 ms == 1 s.
                    )
                );
            }
            firstKeyDown = false;

            // color change on each correct and wrong letter.

            let char = e.key;
            if (passage[count] !== char) {
                let p_tag = document.getElementById(`passage_${count}`);
                if (passage[count] === " ") {
                    p_tag.style.backgroundColor = "#f66";
                } else {
                    p_tag.style.color = "#f66";
                }
            } else {
                let p_tag = document.getElementById(`passage_${count}`);
                p_tag.style.color = "rgb(163, 238, 175)";
                correctLetterCount++;
                isWon(correctLetterCount, passage.length);
            }
            count++;
            setaccuracy(
                parseInt((correctLetterCount / 5 / (passage.length / 5)) * 100)
            );
        };

        // focus on body by default(to start typing without clicking on the page).

        document.body.focus();

        // calling keyDownHandler (named function) on keydown

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
            setConverted(null);
            console.log("unmounted");
        };
    }, [passage]);

    const [wordCount, setwordCount] = useState(1);
    const [usedWords, setusedWords] = useState([]);

    function changePassage() {
        console.log("usedWords: ", usedWords);

        let index = null;
        do {
            index = Math.floor(Math.random() * words.length);
        } while (index in usedWords);
        setPassage(words[index]);
        setusedWords([...usedWords, index]);
        setwordCount(wordCount + 1);
    }

    useEffect(() => {
        if (won) {
            clearInterval(timer);
            if (wordCount <= 10) {
                changePassage();
                setwon(false);
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
        <div className="maingame">
            <div className="instr">
                Instructions: <br />
                Type the words or sentences that appear on the screen as quickly
                and accurately as possible. You can use either a keyboard or a
                mobile device to play the game. The game ends when you reach the
                time limit or make too many mistakes.
            </div>
            <div className="props">
            <div className="values">
                    {/* WPM */}
                    WPM  <br /> {wpm}
                </div>
                <div className="values">
                    TIME  <br /> {parseInt(remainingTime / 60)} :{" "}
                    {parseInt(remainingTime % 60)}
                </div>
                <div className="values" >ACCURACY  <br /> {accuracy}</div>
            </div>
            <div className="wordarea">
                <div className="passage">
                    {/* passage */}
                    {converted}
                </div>
                
                {/* time */}
                
                
            </div>
            {remainingTime === 0 ? (
                <div className="float">time over</div>
            ) : null}
            {won ? (
                <div className="float">
                    You completed the passage in {parseInt(totalTime / 60)} :{" "}
                    {parseInt(totalTime % 60)} min wpm = {wpm}
                    accuracy : {accuracy}
                </div>
            ) : null}
        </div>
    );
}

export default Game;
