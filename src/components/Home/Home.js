import React from 'react'
import './Home.css'
import { useState } from 'react';
import {useNavigate,} from 'react-router'



function Home() {
 const [user, setuser] = useState('')
  const navigate= useNavigate();



  return (
    <div className='mainhome'>
     
     <div className='welcome'>WELCOME!!!!</div>
     <div className='form'>
     <form action="">
     <input className='inputbar'   onChange={(e)=> {setuser(e.target.value); console.log(user)}} 
     placeholder='Enter Your Name' type="text" />
     <input className='submitbtn'   onClick={()=>{navigate("/game")}}  type="submit" />
     </form>
     </div>
      
         
      
    




    </div>
  )
}

export default Home