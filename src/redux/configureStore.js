import { createStore } from "redux";
import { authReducer } from "./authReducer";
import {
  saveDataToStorage,
  getDataFromStorage,
} from "./../theme/utils/storage-utilts";

const configureStore = () => {
  const storageData = getDataFromStorage("global-state");

  let initialState = {
    username: null,
    displayname: null,
    password: null,
    image: null,
    isLoggin: false,
  };

  if (storageData) {
      try {
        initialState = JSON.parse(storageData);
      }
      catch(err){}
  }

  const store = createStore(
    authReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
  store.subscribe((st) =>
    saveDataToStorage("global-state", JSON.stringify(store.getState()))
  );
  
  return store;
};

export default configureStore;

export const store = configureStore();
