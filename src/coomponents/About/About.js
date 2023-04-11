import React from 'react'
import './About.css'

function About() {
  return (
    <div className="mainabout">
      <h1 className='head'>About</h1>
      <div className="intro">
     <h1>Welcome to Typing Titan, the ultimate typing speed challenge! Our game is designed to help you improve your typing speed and accuracy while having fun.</h1>
        
      </div>
      <div className='note'> 
      Features: <br />

                *Multiple levels of increasing difficulty to test your typing skills <br />
              *Randomly generated words and sentences to keep the game fresh and  challenging <br />
              *Customizable settings to adjust the difficulty and speed of the game <br />
*Leaderboard to track your progress and compete with other players around the world <br />
      </div>
      
      <div  className='note'>Developer Information: <br />
        Our team of experienced developers is passionate about creating fun and engaging games that help people improve their skills.
         We believe that everyone can benefit from improving their typing speed and accuracy,
          and we hope that our game will make the learning process more enjoyable.</div>
      <div className='note'>Contact Information: <br />
      If you have any questions, comments, or feedback, please don't hesitate to contact us at support@typingchamp.com. 
      We'd love to hear from you and are always looking for ways to improve our game!</div>
    </div>
  )
}

export default About