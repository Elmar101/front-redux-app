import { createStore } from "redux";
import { authReducer } from './authReducer';

const initialState = {
    username: "user1",
    displayname: "display1",
    password: "P4ssword",
    image: null,
    isLoggin: true,
};

const configureStore = () => {
    return createStore(authReducer ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default configureStore;

export const store = configureStore();