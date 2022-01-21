export const saveDataToStorage = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const getDataFromStorage = (key) => {
    return sessionStorage.getItem(key);
}