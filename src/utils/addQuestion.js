import { auth,db } from "../firebaseConfig"
import { collection, addDoc ,getDocs,updateDoc,doc } from "firebase/firestore";


const addQuestion = async(obj) => {


        try {
            const docRef = await addDoc(collection(db, "quizz"), {
                question: obj.question??null,
                category: obj.category??null,
                reponses: obj.reponses??null,
                correct: obj.correct??null,
                selector: obj.selector??null,
                link:obj.link??null,
                comment:obj.comment??null,
                img:obj.img??null
            
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    

}

const modifyQuestion = async(obj) => {

  console.log("in modify")
    const docRef = doc(db, "quizz", obj.id);

    try {
      await updateDoc(docRef, obj);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  


export  {addQuestion, modifyQuestion}

