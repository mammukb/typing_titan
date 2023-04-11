import React from 'react'
import './Home.css'
import { GoogleLogin } from '@react-oauth/google';

import {useNavigate,} from 'react-router'
function Home() {
  const navigate= useNavigate();


  const responseMessage = (response) => {
    console.log(response);
};
const errorMessage = (error) => {
    console.log(error);
};
  return (
    <div className='mainhome'>
     
     <div className='welcome'>WELCOME!!!!</div>
     <div className='form'>
     <form action="">
     <input className='inputbar' placeholder='Enter Your Name' type="text" />
     <input className='submitbtn'   onClick={()=>{navigate("/game")}}  type="submit" />

     </form>

     </div>
          <div className='google'>
            
            <br />
            <br />
            <GoogleLogin  onSuccess={responseMessage} onError={errorMessage}/>
        </div>
         
      
    




    </div>
  )
}

export default Home