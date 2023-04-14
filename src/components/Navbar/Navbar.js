import React from 'react'
import './Navbar.css'
import {useNavigate,} from 'react-router'


function Navbar() {
  const navigate= useNavigate();
 



  return (
    <div className='navbar'  >
       <h1 className='menu'> MENU </h1>
       <div className='buttons'>
        <button onClick={()=>{navigate("/home")}} className='button'>HOME</button>
       <button onClick={()=>{navigate("/highscore")}} className='button'>HIGH SCORE</button>
       <button onClick={()=>{navigate("/about")}} className='button'>ABOUT</button>
        </div>
       
        
        </div>
  )
}

export default Navbar