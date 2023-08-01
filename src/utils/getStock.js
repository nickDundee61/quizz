import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"
import _stock from "../stock.json"
const getStock = () => {
    var main_stock = null;
    if (localStorage.getItem("BarBarStock") === null) {

        main_stock = _stock;



    } else {
        var retrieve = localStorage.getItem('BarBarStock');
        main_stock = JSON.parse(retrieve)


    }

    return main_stock;

}


const firebaseQuizzQuestion = async () => {
    const arrayStock = [];
    const products = collection(db, "quizz");
    const querySnapshot = await getDocs(products);
  
    await Promise.all(querySnapshot.docs.map(async (doc,index) => {
      const data = doc.data();
      const obj = {
        "id":doc.id,
        "question": data.question,
        "comment" : data.comment??null,
        "correct": data.correct,
        "img": data.img??null,
        "reponses": data.reponses,
        "selector":data.selector
      };
      arrayStock.push(obj);
    }));

    return arrayStock;
  };

export { getStock, firebaseQuizzQuestion }
