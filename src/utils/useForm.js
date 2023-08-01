import {useCallback, useState} from "react";


const useForm =()=> {

const [state, setState] = useState({});


const handleChange =(e)=> {
  

    e.persist(); // Persist the event to ensure event pooling

  
 console.log("in use ")
console.log(e.target.value)
setState(state=>({...state,[e.target.name] : e.target.value}));


}


return [state,handleChange];

}

export default useForm;