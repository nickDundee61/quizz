import React, { useCallback, useEffect } from "react";

import "../style.css";

//import useForm from "../utils/useForm";

import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, getAuth} from "firebase/auth";
import { useState } from "react";
import { auth,db } from "../firebaseConfig"
import { collection, addDoc ,getDocs } from "firebase/firestore";



const Login = ({ setAuthorized, authorized }) => {
  const [email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[exist,setExist]=useState(false)


const addClient = async(email)=> {

    try {
        const docRef = await addDoc(collection(db, "utilisateurs"), {
          email: email,
        
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          // Handle email-already-in-use error
          console.log(error)
          alert("Cette addresse email est déjà enregistrée");
        } else {
          // Handle other errors
          alert("L'enregistrement a échoué...", error);
        }
      }
      



}

const checkEmailType = async (email) => {
    const clientsCollectionRef = collection(db, "utilisateurs");
    const managerCollectionRef = collection(db, "manager");
  
    const [clientsSnapshot, managerSnapshot] = await Promise.all([
      getDocs(clientsCollectionRef),
      getDocs(managerCollectionRef),
    ]);
  
    const isClientEmail = checkEmailInSnapshot(email, clientsSnapshot);
    const isManagerEmail = checkEmailInSnapshot(email, managerSnapshot);
  
    if (isClientEmail) {
      return "utilisateur";
    } else if (isManagerEmail) {
      return "manager";
    } else {
      return "unknown";
    }
  };
  
  const checkEmailInSnapshot = (email, snapshot) => {
    return snapshot.docs.some((doc) => doc.data().email === email);
  };

  const isAuthenticated = async () => {
    console.log("in auth")
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const authorizationType = await checkEmailType(email);
  
      if (authorizationType === "manager") {
        setAuthorized("manager");
        console.log(authorized);
      } else if (authorizationType === "utilisateur") {
        setAuthorized("utilisateur");
        console.log(authorized);
      }
    } catch (error) {
      console.log('User does not exist');
    }
  }
  
  const signIn = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await addClient(email);
      // Continue with further actions if necessary
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log(error);
        alert("Cette adresse email est déjà enregistrée");
      } else {
        alert("L'enregistrement a échoué...", error);
      }
    }
  };

  const onLogOffClick = (e) => {
    setAuthorized("");
  };



const handleChange  = (e)=>{

  if(e.target.id ==="email"){

    setEmail(e.target.value);
  }else if(e.target.id=="password"){

    setPassword(e.target.value)
  }


}

  const WelcomePrompt = ({signIn}) => {

   
    return (
      <div className="WelcomePromptBlock">
        <div id="connect" onClick={isAuthenticated}>
          Se Connecter avec ces logs
        </div>
        <div  id="create" onClick={signIn}>
          Créer un compte avec ces logs
        </div>
       
      </div>
    );
  };

 

  const LogOff = () => {
    return (
      <div className="logOff" onClick={onLogOffClick}>
        <h1>X</h1>
      </div>
    );
  };



  return  (authorized ==="" ?<div><TypeLoginAndPassWord email={email} password={password} handleChange={handleChange} /><WelcomePrompt signIn={signIn}/></div>: <LogOff/>);
};


const TypeLoginAndPassWord = ({email,password,handleChange,auth}) => {
    return (
      <div className="login">
        <form >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="login" style={{ color: 'white', padding: '5px' }}>
              Login
            </label>
            <input
         value={email || ""}
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="Email"
              style={{
                outline: 'black 1px solid',
                borderRadius: '5px',
                margin: '2px',
              }}
            ></input>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="password" style={{ color: 'white', padding: '5px' }}>
              Password
            </label>
            <input
           value={password || ""}
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              style={{
                outline: 'black 1px solid',
                borderRadius: '5px',
                margin: '2px',
              }}
            ></input>
          </div>

       
        </form>
      </div>
    );
  };



export default Login;