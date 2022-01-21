import { createStore } from "redux";
import { authReducer } from "./authReducer";

const configureStore = () => {
  return createStore(
    authReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default configureStore;

export const store = configureStore();
