const Selector = ({ masterSelector, setMasterSelector ,setNewRightAnswer, setNewChoices}) => {

    const setSelectorLayout = (e) => {
        setMasterSelector(e.target.id);
       
        setNewRightAnswer([])
        if(e.target.id==="string"){
            
            let tempArr=[""];
            setNewChoices(tempArr)
            

        }else{

            let tempArr=["","","",""];
            setNewChoices(tempArr)
            
     

        }

    }

    return (<div className="selector">
        <div onClick={setSelectorLayout} id="checkbox" style={masterSelector === "checkbox" ? { borderColor: "green" } : { borderColor: "white" }}>CheckBox</div>
        <div onClick={setSelectorLayout} id="radio" style={masterSelector === "radio" ? { borderColor: "green" } : { borderColor: "white" }}>Radio</div>
        <div onClick={setSelectorLayout} id="string" style={masterSelector === "string" ? { borderColor: "green" } : { borderColor: "white" }}> Chaîne</div>
        <div onClick={setSelectorLayout} id="image" style={masterSelector === "image" ? { borderColor: "green" } : { borderColor: "white" }}>Image</div>
        {masterSelector==="image"? <div onClick={setSelectorLayout} id="type" >Type</div>:null}
    </div>)
}

export default Selector
