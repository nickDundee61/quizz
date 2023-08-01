import "./questionStyle.css"
import Header from "./components/Header";


import { useState, useEffect,createContext } from "react";
import Login from "./components/Login";
import Category from "./components/Category";
import DetailedSelection from "./components/DetailedSelection";
import { getStock } from "./utils/getStock";
import { ReactDOM , Routes, Route} from "react";

import {firebaseQuizzQuestion} from "./utils/getStock"
import { auth } from "./firebaseConfig";
import Question from "./components/Question";
/*<div>{mode==="production" && <Category/>}
{authorized ===true &&  <Container setTicket={setTicket} ticket={ticket} mode={mode} setMode={setMode} />}
</div>*/

export const MainContex=createContext();
function App() {


  // Save the stringified JSON object in localStorage


 const [quizzQuestion,setquizzQuestion] = useState([]);

  const [ticket, setTicket] = useState([]);

  const [mode, setMode] = useState("production");
  const [authorized, setAuthorized] = useState("");
  const [name, setName]= useState("")
  const[stock,setStock] =useState(getStock());

var test = null;
if( (authorized ==="manager" || authorized ==="utilisateur") ){


 test =<div >

<Question mode={mode} setMode ={setMode} setAuthorized= {setAuthorized} authorized={authorized}/></div>

}
  return (
 <MainContex.Provider value={[name,setName,ticket,setTicket,mode,setMode,stock,setStock,authorized]}>   <div className="main">
{authorized ==="" ?<Header mode={mode} setMode ={setMode} setAuthorized= {setAuthorized} authorized={authorized}/>:test}



    </div></MainContex.Provider>
  );
}

export default App;
