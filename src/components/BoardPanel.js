import React from "react";

import "../style.css";


const BoardPanel = ({setMode, authorized}) => {



    const handleClick = (e) => {

        if (e.target.id === "prod") {
            let element = document.getElementById("prod");
            element.style.borderColor = "green";
            element = document.getElementById("stock");
            element.style.borderColor = "white";
            setMode("production");
            let panelVisible = document.getElementById('editPanelId');
            panelVisible.style.visibility = "hidden";
        } else if (e.target.id === "stock") {
            let element = document.getElementById("stock");
            element.style.borderColor = "green";
            element = document.getElementById("prod");
            element.style.borderColor = "white";
            setMode("stock");

        }

    }
    return (authorized =="manager" &&<div className="boardPanel">
     
        <div className="boardPanelButton" onClick={handleClick} id="stock">BDD</div>
        <div className="boardPanelButton" onClick={handleClick} id="stock">ADMINISTRATION</div>


    </div>)
}

export default BoardPanel;