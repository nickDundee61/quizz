import React, { useEffect } from "react";
import "../style.css"
import _stock from '../stock.json'

import { MainContex } from "../App";
import { useState, useContext } from "react";


const Category = () => {
    let uniqueArray = [];
    const [name, setName, ticket, setTicket, mode, setMode, stock, setStock, authorized] = useContext(MainContex);
    const [cat, setCat] = useState("Bière");
    var main_stock = stock;

    useEffect(() => {
        for (let el in uniqueArray) {

            let selectedCat = document.getElementById(uniqueArray[el]);
          
                selectedCat.style.borderColor = "white";

            


        }
        let selectedCat = document.getElementById(cat);
        if (selectedCat !== null) {
            selectedCat.style.borderColor = "greenYellow";

        }


    }, [cat])


    let tempArray = [];
    const handleClick = (e) => {

        const ds =document.getElementById("DetailedSelection");
        ds.style.visibility = "hidden";
        setCat(e.target.id);

     
        let unicselectedCat = document.getElementById(cat);
        unicselectedCat.style.borderColor = "greenYellow";
      
    }
    for (let el in main_stock) {
        tempArray.push(main_stock[el].category);

    }
    uniqueArray = Array.from(new Set(tempArray));

    let category = uniqueArray.map((el, key) => <div key={key} style={{
        display: "inline-block",
        justifyContent: 'space-between', flexDirection: "row"
    }}><div className="category" onClick={handleClick} id={el}>{el}</div></div>


    )

    return (<div >{category}</div>)

}

export default Category;