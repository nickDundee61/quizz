import React, { useEffect } from "react";
import "../style.css";
import _stock from "../stock.json"
import { useContext,useState } from "react";
import { MainContex } from "../App";
import { useNavigate } from 'react-router-dom';
const DetailedSelection = () => {

    const [name,setName,ticket,setTicket,mode,setMode,stock,setStock,authorized]= useContext(MainContex);
let Index = 0;
  const [quantityLeft, setQuantityLeft] = useState(0);
useEffect(()=> {

    for (let idx in main_stock) {

        if (main_stock[idx].name === name) {
           
    setQuantityLeft(main_stock[idx].quantity);
   Index = idx;
}
        }
},[name])
   
    var main_stock = stock;

    var detailSelectionArray = [];
    var currentObj = [];
    for (let idx in main_stock) {

        if (main_stock[idx].name === name) {
            currentObj = [...main_stock[idx].division]
          
            for(let el in main_stock[idx].division) {
                for (const [key, value] of Object.entries(main_stock[idx].division[el])) {
                    if(key==="name"){
                        detailSelectionArray.push([value])

                    }
                   
                
                  
    
                }

            }
          

        }
    }

    const InfoOnProduct = () => {
return(<div className="infoOnLabel"><div>{name}</div><div>{quantityLeft}</div></div>)

    }
    const handleChange = (e) => {
        let obj = null;
        let price = 0;
        let realQty =0;

let found = false;
        let test = e.target.id;
      
        for (let p in currentObj) {
            if(currentObj[p].name === test) {

            
                if(quantityLeft < 1) {
                   
                        return;
                    }
                price = parseFloat(currentObj[p].price);
                realQty = currentObj[p].size;
               
                break;

            }
          

           
           

        }

        obj = { "name": name, "division": e.target.id, "quantity": 1, "price": price, "realQuantity":realQty};
setQuantityLeft((q)=>(q-realQty).toFixed(2));
        if (ticket.length === 0) 
        {
            setTicket((t) => ([...t, obj]));



        } else 
        {

            for (let idx in ticket) 
            {

                if (ticket[idx].name == obj.name && ticket[idx].division == obj.division) {

                    let copyTicket = [...ticket];
                    let copyOfObj = ticket[idx];
                    copyOfObj.quantity++;
                    copyOfObj.price += price;
                    copyTicket[idx] = copyOfObj;
                    found= true;
                    setTicket(copyTicket);

                }
            }


     

        if (found === false) {
            setTicket((t) => ([...t, obj]));

        }
     //   navigate('/client', { state: { ticket } });
        }


    }
    var selection = detailSelectionArray.map((e, key) => (<div key={key} className="detailedSelection" id={e}>{e}</div>));
    return (<div id="DetailedSelection" className="detailedSelectionMaster"><div className="detailedSelectionBlock" onClick={handleChange}>{selection}</div><InfoOnProduct/></div>)

}

export default DetailedSelection;