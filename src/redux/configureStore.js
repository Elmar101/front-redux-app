import { createStore, applyMiddleware,compose } from "redux";
import { authReducer } from "./authReducer";
import thunk from "redux-thunk";
import { setDataToStorage, storageData } from "./../theme/utils/storage-utilts";
import { setAuthorizationHeader } from "../api/apiCalls";

const configureStore = () => {
  let initialState = storageData("global-state");

  setAuthorizationHeader(initialState);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    authReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
  
  store.subscribe( () => {
    console.log("store",store.getState())
    const data = store.getState();
    setDataToStorage( "global-state", JSON.stringify( data ) ) ;
    setAuthorizationHeader({token: data.token ,isLoggin: data.isLoggin});
  });
  
  return store;
};

export default configureStore;
export const store = configureStore();
