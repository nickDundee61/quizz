import React from "react";
import "../style.css";
import Login from "./Login";
import BoardPanel from "./BoardPanel";
const Header = ({setMode,authorized, setAuthorized,goodAnswer})=> {

return (
<div className="header">
<BoardPanel  setMode = {setMode} authorized= {authorized}/>
<div className="commentaireReponse" >{goodAnswer === true && <div style ={{backgroundColor :"green"}}>VRAI
        </div>} { goodAnswer ===false &&<div style ={{backgroundColor :"red"}}>FAUX</div>}</div>
  <Login setAuthorized= {setAuthorized}authorized= {authorized}/>
</div>
)

}

export default Header;