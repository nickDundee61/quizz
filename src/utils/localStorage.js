function formatLocalStorageToJson() {
    const localStorageObj = {};
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
  
      try {
        localStorageObj[key] = JSON.parse(value);
      } catch (error) {
        // Handle parsing errors if necessary
        console.error("Error parsing value for key:", key);
      }
    }
  
    return localStorageObj;
  }
  
  const localStorageData = formatLocalStorageToJson();
  console.log(localStorageData);

  function setJsonToLocalStorage(data) {


    // Convert JSON object to string
    const dataString = JSON.stringify(data);
    
    // Save the stringified JSON object in localStorage
    localStorage.setItem("BarBarStock", dataString);

  }

  function readLocalStorage() {
    const storedDataString = localStorage.getItem("BarBarStock");

    if (storedDataString) {
      // Convert the stored string back to a JSON object
      const storedData = JSON.parse(storedDataString);
    
      console.log(storedData); // Output: { key: "value" }
    }


  }

  export {formatLocalStorageToJson, setJsonToLocalStorage,readLocalStorage}