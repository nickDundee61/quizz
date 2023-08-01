import "../questionStyle.css"
import questionObject from "../question.json"
import { useState, useEffect, useCallback } from "react"
import { auth,db,storage } from "../firebaseConfig"
import { collection, addDoc ,getDocs } from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
  } from "firebase/storage";
  import { v4 } from "uuid";
const Choices = ({ choices, setChoices,
    editMode, setEditMode, voirReponse,
    rightAnswer, setRightAnswer,
    id, userResponse,
    setUserResponse, masterSelector,
    currentSelector, setCurrentSelector, newFieldOnEdit, setNewFieldOnEdit,
    newQuestion, setNewQuestion, newChoices, setNewChoices, newRightAnswer, setNewRightAnswer, IsValid, setIsValid, nouveau, setNouveau, questionDataBase,setQuestionDataBase }) => {
    let arr = [];
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storage, "images/");

    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });
      };
    
  /*  useEffect(() => {
        listAll(imagesListRef).then((response) => {
          response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setImageUrls((prev) => [...prev, url]);
            });
          });
        });
      }, []);*/
    const editChoices = useCallback((e) => {
    
            setChoices((prevC) => {
                let tempChoice = [...prevC];
                if(currentSelector !=="string")
                for (let t in tempChoice) {

                    if (t === e.target.id) {
    /*sconst input = "PéDaler ";

// Trim the string
const trimmed = input.trim();

// Set it to lowercase
const lowercase = trimmed.toLowerCase();

// Remove accents (diacritical marks)
const withoutAccents = lowercase.normalize("NFD").replace(/[\u0300-\u036f]/g, "");*/
                        tempChoice[t] = e.target.value;

                    }
                }else{

                   if(currentSelector==="string"){

    tempChoice[0]=e.target.value;
} 
                }

                return tempChoice;
            })

        

    }, []);
 
    const editNewChoices = useCallback((e) => {
        let tempChoice=[];
        
        setNewChoices((prevC) => {
        tempChoice    = [...prevC];
        if(currentSelector !== "string") {
  for (let t in tempChoice) {

                if (t === e.target.id) {

                    tempChoice[t] = e.target.value;

                }
            }
            
            
        }else {

            tempChoice[0]=e.target.value
        }
          
        
            return tempChoice;
        })

       


    }, [])

    useEffect(() => {

        let minStringSize=0;
        let minChoiceSize=0;
        let minQuesSize=0;
      

        if(masterSelector==="string"){
             minStringSize=3;
             minChoiceSize=0;
             minQuesSize=10;
            
    

        }else{

             minStringSize=3;
             minChoiceSize=1;
             minQuesSize=10;
            
    
        }
        const allStringsHaveLength = newChoices.every((str) => str.length >= minStringSize);
        const newChoicesLengthOk = newChoices.length >= minChoiceSize;
        const questionIsLongEnough = newQuestion.length > minQuesSize;
        const correctSize = newRightAnswer.length > 0;

        if(masterSelector !=="string" ){

            if (allStringsHaveLength && newChoicesLengthOk && questionIsLongEnough && correctSize) {
                setIsValid(true);
              } else {
                setIsValid(false);
              }


        }else{

            if (allStringsHaveLength && newChoicesLengthOk && questionIsLongEnough ) {
                setIsValid(true);
              } else {
                setIsValid(false);
              }



        }
      
     
      }, [newChoices, newQuestion, newRightAnswer]);




 
    const getChecked = (k) => {
        if (voirReponse || editMode === true) {
            for (let el in rightAnswer) {

                if (rightAnswer[el] === k) {

                    return true;
                }
            }


        } else if (nouveau === true) {

            if(masterSelector==="checkbox"){

                
            }
            for (let el in newRightAnswer) {

                if (newRightAnswer[el] == k) {

                    return true;
                }
            }
            //déclarer un tableau vide
            //si l'id existe la retirer
            //si l'id n'existe pas l'ajouter
            //mettre à jour le state newRightAnswer
        
        }

        return false
    }

    const addInputField = () => {
        if (nouveau === false) {
            setChoices(prevC => [...prevC, ""]);

        } else {

            setNewChoices(prevC => [...prevC, ""]);
          
        }

        //  setNewFieldOnEdit(true);

    }

    const chooseGoodAnswer = (e) => {

        let include = false;
        let index = 0;
        let tempRight = [...rightAnswer];
        for (let el in tempRight) {
            if (tempRight[el] === parseInt(e.target.id)) {

                include = true;
                index = el;
            }

        }
        if (include === true) {

            tempRight.splice(index, 1);
        } else {
            tempRight.push(parseInt(e.target.id))


        }
        if (nouveau === false) {
            setRightAnswer(tempRight);
            questionDataBase.forEach((question) => {
                if (question.id === id) {
                    question.correct = tempRight;
                }
            });


        } 

        

    }
    
  

  
 
    const chooseNewGoodRightAnswer = (k) => {
        const id = parseInt(k.target.id);
      
        if (masterSelector === "checkbox") {
          setNewRightAnswer((prevRightAnswer) => {
            if (prevRightAnswer.includes(id)) {
              return prevRightAnswer.filter((item) => item !== id);
            } else {
              return [...prevRightAnswer, id];
            }
          });
        } else if (masterSelector === "radio") {
          setNewRightAnswer([id]);
        }
      };
     
    const removeField = (e) => {
        const index = parseInt(e.target.id);

       
if(nouveau===true){
    const NewupdatedChoices = [...newChoices];
    NewupdatedChoices.splice(index, 1);
    setNewChoices(NewupdatedChoices);
    setIsValid(false)
}else {
   
    const updatedChoices = [...choices];
    updatedChoices.splice(index, 1);
    setChoices(updatedChoices);
    questionObject.questions.forEach((question) => {
        if (question.id === id) {
            question.reponses = updatedChoices;
         
            setQuestionDataBase(questionObject);
        }
    });
};
}
        

   

    const recordUserChoice = useCallback((k) => {
        let recordArr = [...userResponse];


        for (let el in recordArr) {

            if (recordArr[el] === k) {

                return true;
            }
        }


        return false;
    })


    const recordUserChoiceOnChange = (e) => {


        if (currentSelector === "checkbox") {

            let recordArr = [...userResponse];

            if (recordArr.includes(parseInt(e.target.id))) {

                let test = recordArr.filter(el => el === parseInt(e.target.id))

                setUserResponse(test)
            } else {

                recordArr.push(parseInt(e.target.id))

                setUserResponse(recordArr)
            }

        } else if (currentSelector === "radio") {
            let testArr = [];
            testArr[0] = parseInt(e.target.id);
            setUserResponse(testArr)

        } else if (currentSelector === "string") {

            let testArr = [];
            testArr[0] = e.target.value;

            setUserResponse(testArr);

        }


    }

      
      // Trigger the saveImagesToFile function when the newChoices state changes

    let result = null;
    if (editMode == false && voirReponse === false) {

        if (currentSelector === "checkbox") {
            result = <form>{choices.map((el, index) => <div key={index}>
                <input id={index} type={currentSelector} checked={recordUserChoice(index)} onChange={recordUserChoiceOnChange} />{el}</div>)}
            </form>
        } else if (currentSelector === "radio") {

            result = <form>
                {choices.map((el, index) => <div key={index}>
                    <input id={index} type={currentSelector} checked={recordUserChoice(index)} onChange={recordUserChoiceOnChange} />{el}</div>)}

            </form>

        } else if (currentSelector === "string") {

            result = <input id="stringInput" type={currentSelector} onChange={recordUserChoiceOnChange}></input>
        }


    }
    else if (editMode === false && voirReponse === true) {
        if (currentSelector === "string") {
            result = <form>{choices.map((el, index) => <div key={index}><input id={index} type="text" checked={getChecked(index)} readOnly/>{el}</div>)}
            </form>
      
        }else{
    result = <form>{choices.map((el, index) => <div key={index}><input id={index} type={currentSelector} checked={getChecked(index)} readOnly/>{el}</div>)}
        </form>

        }
    

        //EDIT MODE
    }
    else if (editMode === true) {
        
        if (currentSelector === "string") {
            result = <div >
                <input
                    id="stringInput" 
                    type="text"
                    placeholder={masterSelector}
                    style={{ width: "400px" }}
value ={choices[rightAnswer[0]] || null}
                    onChange={editChoices} />

            </div>


        } else {
            result = <div>{choices.map((el, index) => <div key={index}><input
                id={index} type="text"
                placeholder={masterSelector}
                style={{ width: "400px" }}
                value={choices[index] || ""}
                onChange={editChoices} />
                <button id={index} onClick={removeField}>-</button>
                <input type="checkbox" id={index} checked={getChecked(index)}
                    onChange={chooseGoodAnswer}></input>
            </div>)}
                <button onClick={addInputField}>+</button></div>

        }

        //NOUVEAU
    }

    if (nouveau === true) {

        let obj= {}
if(masterSelector ==="checkbox" || masterSelector==="radio"){

    result = <div>{newChoices.map((el, index) => <div key={index}><input 
    id={index} type="text"
    placeholder={masterSelector}
    style={{ margin:"0px",width:"100%",display:"table-cell"}}
    value={newChoices[index] || ""}
    onChange={editNewChoices} />
    <button id={index} onClick={removeField}>-</button>
    <input type={masterSelector} id={index} checked={getChecked(index)}
        onChange={chooseNewGoodRightAnswer}></input>
</div>)}
    <button onClick={addInputField}>+</button></div>


}else if(masterSelector==="string"){

    result = <div>{newChoices.map((el, index) => <div key={index}><input
    id={index} type="text"
    placeholder={masterSelector}
    style={{ width: "400px" }}
    value={newChoices[index] || ""}
    onChange={editNewChoices} />
   
 
</div>)}
   </div>

    
}else if(masterSelector==="image"){

    result = (
        <div>
        <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
          
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {imageUrls.map((url, index) => {
        return (<div key={index}><img style={{width:"100px",height:"100px"}}key={index}src={url} /></div>);
      })}
    </div>
  );
   //   saveImagesToFile();
}      

    }

    return (<div><div className="choices">{result}</div></div>)

}

export default Choices
