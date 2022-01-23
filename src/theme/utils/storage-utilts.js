export const setDataToStorage = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const getDataFromStorage = (key) => {
    return sessionStorage.getItem(key);
}

export const storageData = (key) => {
   
    let initialState = {
      username: null,
      displayname: null,
      password: null,
      image: null,
      isLoggin: false,
    };
  
    if ( getDataFromStorage(key) ) {
        try {  initialState = {...JSON.parse(storageData)}; }
        catch(err){}
    }

    return initialState;
}