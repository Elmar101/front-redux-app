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
    return createStore(authReducer, initialState);
}

export default configureStore;

export const store = configureStore();