export const setDataToStorage = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const getDataFromStorage = (key) => {
    return sessionStorage.getItem(key);
}

export const storageData = (key) => {
   
    let initialState = {};
  
    if ( getDataFromStorage(key) ) {
        try {  initialState = {...JSON.parse(getDataFromStorage(key))}; }
        catch(err){}
    }

    return initialState;
}