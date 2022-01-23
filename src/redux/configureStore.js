import { createStore, applyMiddleware,compose } from "redux";
import { authReducer } from "./authReducer";
import thunk from "redux-thunk";
import { setDataToStorage, storageData } from "./../theme/utils/storage-utilts";

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    authReducer,
    storageData("global-state"),
    composeEnhancers(applyMiddleware(thunk))
  );
  
  store.subscribe( () => setDataToStorage( "global-state", JSON.stringify(store.getState() ) ) );
  
  return store;
};

export default configureStore;
export const store = configureStore();
