import React from "react";
import "../questionStyle.css"
import { useState, useEffect, useCallback } from "react";

import questionObject from "../question.json"
import Selector from "./Selector"
import Choices from "./Choices"
import {addQuestion, modifyQuestion} from "../utils/addQuestion"
import { firebaseQuizzQuestion } from "../utils/getStock";
import Header from "./Header";

const getRandomNumber = (length) => {

    return Math.floor(Math.random() * length)
}
   var questionsArray = questionObject.questions;
const Question = ({mode, setMode,setAuthorized,authorized}) => {
    const [user, setUser] = useState("");
    const [loaded, setIsLoaded ]= useState(false);
    const [questionDataBase,setQuestionDataBase]=useState([])
    const [random, setRandom] = useState(getRandomNumber(questionsArray.length));
    const [question, setQuestion] = useState("");
    const [choices, setChoices] = useState([]);
    const [editMode, setEditMode] = useState(false)
    const [newFieldOnEdit,setNewFieldOnEdit]= useState(false);
    const [editButtonValue, setEditButtonValue] = useState("Edit");
    const [rightAnswer, setRightAnswer] = useState([]);
    const [voirReponse, setVoirReponse] = useState(false)
    const [id, setId] = useState(null);
    const [userResponse, setUserResponse] = useState([]);
    const [nouveau, setNouveau] = useState(false);
    const [masterSelector, setMasterSelector] = useState("checkbox")
    const [currentSelector, setCurrentSelector] = useState("")
    const [newQuestion, setNewQuestion]= useState("");
    const [newChoices, setNewChoices]= useState([]);
    const [newRightAnswer,setNewRightAnswer]=useState([]);
    const [IsValid,setIsValid]=useState(false);
    const [goodAnswer,setGoodAnswer] = useState(null);

useEffect(() => {
    const fetchData = async () => {
      const firebaseQuestions = await firebaseQuizzQuestion();
      if (firebaseQuestions.length > 0) {
        setQuestionDataBase(firebaseQuestions);
        setRandom(getRandomNumber(firebaseQuestions.length));
        questionsArray = [...questionDataBase]
        setIsLoaded (true);
    
    
      }
    };

    fetchData();
  }, []);




useEffect(() => {

    if(questionDataBase.length > 0) {
    setRandom(getRandomNumber(questionDataBase.length));
    setQuestion(questionDataBase[random].question);
    setChoices(questionDataBase[random].reponses);
    setRightAnswer(questionDataBase[random].correct);
    setId(questionDataBase[random].id);

    setCurrentSelector(questionDataBase[random].selector)
    setQuestionDataBase(questionDataBase);
    setGoodAnswer(null);
    


    }


    

   

}, [loaded]);




    



    return (loaded===true?<div className="questionContainer"> 
          <Header mode={mode} setMode ={setMode} setAuthorized= {setAuthorized} authorized={authorized} goodAnswer={goodAnswer}/>
        {nouveau === true ? <Selector masterSelector={masterSelector} setMasterSelector={setMasterSelector} setNewRightAnswer={setNewRightAnswer} newChoices={newChoices} setNewChoices={setNewChoices}/> : null}
        <QuestionField editMode={editMode} question={question} setQuestion={setQuestion} id={id} nouveau={nouveau} setNewQuestion={setNewQuestion} newQuestion={newQuestion} questionDataBase={questionDataBase} setQuestionDataBase = {setQuestionDataBase} />
        <Choices choices={choices}
            setChoices={setChoices}
            editMode={editMode}
            setEditMode={setEditMode}
            rightAnswer={rightAnswer}
            setRightAnswer={setRightAnswer}
            voirReponse={voirReponse}
            setVoirReponse={setVoirReponse}
            userResponse={userResponse}
            setUserResponse={setUserResponse}
            masterSelector={masterSelector}
            setMasterSelector={setMasterSelector}
            currentSelector={currentSelector}
            setCurrentSelector={setCurrentSelector}
            id={id} 
            newFieldOnEdit={newFieldOnEdit}
            setNewFieldOnEdit={setNewFieldOnEdit}
            IsValid ={IsValid}
            setIsValid={setIsValid}
            newQuestion ={newQuestion}
            setNewQuestion ={setNewQuestion}
            newChoices={newChoices}
            setNewChoices={setNewChoices}
            newRightAnswer={newRightAnswer}
            setNewRightAnswer={setNewRightAnswer}
            nouveau={nouveau}
            setNouveau={setNouveau}
            questionDataBase={questionDataBase}
            setQuestionDataBase={setQuestionDataBase}/>
            
        <ButtonContainer questionsArray={questionsArray}
            random={random}
            setRandom={setRandom}
            question={question}
            setQuestion={setQuestion}
            choices={choices}
            setChoices={setChoices}
            editMode={editMode}
            setEditMode={setEditMode}
            editButtonValue={editButtonValue}
            setEditButtonValue={setEditButtonValue}
            rightAnswer={rightAnswer}
            setRightAnswer={setRightAnswer}
            voirReponse={voirReponse}
            setVoirReponse={setVoirReponse}
            userResponse={userResponse}
            setUserResponse={setUserResponse}
            id={id}
            setId={setId}
            nouveau={nouveau}
            setNouveau={setNouveau}
            currentSelector={currentSelector}
            setCurrentSelector={setCurrentSelector}
            masterSelector={masterSelector}
            setMasterSelector={setMasterSelector}
            newFieldOnEdit={newFieldOnEdit} 
            setNewFieldOnEdit={setNewFieldOnEdit}
            newQuestion ={newQuestion}
            setNewQuestion ={setNewQuestion}
            newChoices={newChoices}
            setNewChoices={setNewChoices}
            newRightAnswer={newRightAnswer}
            setNewRightAnswer={setNewRightAnswer}
            IsValid={IsValid}
            setIsValid={setIsValid}
            questionDataBase={questionDataBase}
            setQuestionDatBase={setQuestionDataBase}
            goodAnswer={goodAnswer}
            setGoodAnswer={setGoodAnswer}
            setIsLoaded={setIsLoaded}
            
           />
            

  </div> : <h1 style ={{color:"white"}}>"Chargement...</h1>)
}

const ButtonContainer = ({
    questionsArray,
    random,
    setRandom,
    question,
    setQuestion,
    choices,
    setChoices,
    editMode,
    setEditMode,
    editButtonValue,
    setEditButtonValue,
    rightAnswer,
    setRightAnswer,
    voirReponse,
    setVoirReponse,
    userResponse,
    setUserResponse,
    id,
    setId,
    nouveau,
    setNouveau,
    currentSelector,
    setCurrentSelector,
    masterSelector,
    setMasterSelector,newFieldOnEdit,setNewFieldOnEdit,
    newQuestion,setNewQuestion,newChoices,setNewChoices,newRightAnswer,setNewRightAnswer,IsValid,setIsValid, questionDataBase,setQuestionDatBase, goodAnswer,setGoodAnswer ,setIsLoaded}) => {

     
    const onOkButtonClick = () => {

 
        if (editMode === false && userResponse.length > 0) {

            if (currentSelector === "string") {
          
                if (userResponse[0] == choices[0]) {
                 
setGoodAnswer(true);
                  
                }else{
                setGoodAnswer(false);}


            } else {
                const haveSameValues = userResponse.length === rightAnswer.length && userResponse.every(value => rightAnswer.includes(value));

                if (haveSameValues) {
                
                    setGoodAnswer(true);
                } else {
                   
                    setGoodAnswer(false);
                }
            }
           
        }

        //blocque les autre mode

//déclanche nouvelle question
        nexQuestion();
    };

    const nexQuestion=()=>{
       
     let  setTime = 0;
       if(userResponse.length=== 0) {

        setTime = 0;
       }else {

        setTime = 1000;
       }
  
        setTimeout(() => { 
            
            if(questionDataBase.length > 0 ){
                
                
                const newRand = getRandomNumber(questionDataBase.length);
        setRandom(newRand);

        setQuestion(questionDataBase[newRand].question);
        setChoices(questionDataBase[newRand].reponses);
        setRightAnswer(questionDataBase[newRand].correct);
        setId(questionDataBase[newRand].id);
        setCurrentSelector(questionDataBase[newRand].selector)
        setVoirReponse(false);
        setUserResponse([])
        setGoodAnswer(null);
            setGoodAnswer(null);
            }else{

                return;
            }
          }, setTime); 
       


    }

    const onEditButtonClick = () => {





if(editMode ===true) {
    let obj = {};
    for (let el in questionDataBase) {
     
        if (questionDataBase[el].id === id ) {
   
            obj = questionDataBase[el];
            obj.reponses = [...choices];
            obj.question = question;
            obj.correct = [...rightAnswer]
          
   
           
        
          
            modifyQuestion(obj);
          
            break;
   
        }
    }


}


 setEditMode(!editMode);    

    }
    const onNouveauButtonClick = (e) => {


      setNouveau(!nouveau);
      setEditMode(false)
      setNewRightAnswer([])
    var tempArr=null;
      if(masterSelector==="string"){
        tempArr=[""];

    }else{
        tempArr = ["", "", "", ""];
     
    }

            
            setNewChoices(tempArr)
            setNewQuestion("")
setMasterSelector("checkbox")

          
            setUserResponse([])
          
        
         



    }

    const onVoirReponseClick = () => {

        setVoirReponse(!voirReponse)

    }
    const validateNewObject=()=>{

        let obj={};
    
        obj.question = newQuestion;
        obj.reponses =newChoices;
        obj.correct = newRightAnswer;
        obj.selector = masterSelector;
        

        addQuestion(obj);



      
        
        
        setNouveau(false)
        setIsValid(false);
        setMasterSelector("checkbox")

        
        }
    let RepMessage = voirReponse === false ? "Réponse" : "Choix";
    let NewButtonMessage = nouveau === false ? "Nouveau" : "Annuler"
    let EditButtonValue = editMode===false?"Edit":"Ok"

   

    return (<div ><div className="buttonContainer" >

       {editMode===false?<div className="newButton" onClick={onNouveauButtonClick}>{NewButtonMessage}</div>:null}
        {nouveau===false && editMode ===false && userResponse.length > 0 ?<div className="okButton" onClick={onOkButtonClick}>VALIDER</div>:null}
        {nouveau===false && editMode ===false?<div className="okButton" onClick={onVoirReponseClick}>{RepMessage}</div>:null}
        {nouveau===false && editMode ===false?<div className="editButton" onClick={nexQuestion}>++</div>:null}
        {nouveau===false? <div className="editButton" onClick={onEditButtonClick}>{EditButtonValue}</div>:null} 
        {IsValid===true?<div className="okButton" onClick={validateNewObject}>VALIDER</div>:null}

        </div></div>)
}


const QuestionField = ({ question, editMode, setQuestion,newQuestion,setNewQuestion, id,nouveau }) => {

    const editQuestion = useCallback((e) => {
        setQuestion(prevQ => {

            let question = e.target.value;
            return question;

        })

    }, []);

    const editNewQuestion = useCallback((e) => {
        setNewQuestion(prevQ => {

            let question = e.target.value;
            return question;

        })

    }, []);
    questionObject.questions.forEach((Q) => {
        if (Q.id === id) {
            Q.question = question;
        }
    });

    let question_field = null;
    if (editMode == false) {

        question_field = <div className="question">{question}</div>;
    } else if(editMode===true){
        question_field = <input type="text" value={question || ""} className="questionField"onChange={editQuestion}></input>

    }
 if(nouveau===true) {

        question_field = <div className="newQuestionField"><input type="text" placeholder=" Libellé" value={newQuestion || ""}  onChange={editNewQuestion}></input></div>

    }
    return (question_field)

}




export default Question;