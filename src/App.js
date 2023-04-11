import Namecard from "./coomponents/Namecard/Namecard";
import './App.css'
import Navbar from "./coomponents/Navbar/Navbar";
import { Route,Routes} from "react-router-dom";
import Home from  "./coomponents/Home/Home"
import Highscore from  "./coomponents/Highscore/Highscore"
import About from  "./coomponents/About/About" 
import Game from "./coomponents/Game/Game"



 
function App() {
  
  return (   
    <div className="App">          
<Namecard/> 
<div  className="middle">
<Navbar/>   

<Routes>
  <Route  Component={Home}  path="/home"  />  
  <Route  Component={Highscore}  path="/highscore"  />   
  <Route  Component={About}  path="/about"  />  
  <Route   Component={Game} path="/game"  />
</Routes>
</div>


     
    </div>
  );
}

export default App;