import Namecard from "./components/Namecard/Namecard";
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import { Route,Routes} from "react-router-dom";
import Home from  "./components/Home/Home"
import Highscore from  "./components/Highscore/Highscore"
import About from  "./components/About/About" 
import Game from "./components/Game/Game"



 
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