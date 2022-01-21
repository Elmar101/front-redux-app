import { ACTION_TYPE } from "./Constans";

const defaultState = {
    username: null,
    displayname: null,
    password: null,
    image: null,
    isLoggin: false,
}

export const authReducer = (state = {...defaultState}, action) => {
    if (action.type === ACTION_TYPE.LOGIN_SUCCESS) {
        return {
          ...state,
          username: action.payload.username,
          displayname: action.payload.displayname,
          password: action.payload.password,
          image: action.payload.image,
          isLoggin: true,
        };
    }
    else if (action.type === ACTION_TYPE.LOGOUT_SUCCESS) {
      return {
        ...state,
        username: action.payload.username,
        displayname: action.payload.displayname,
        password: action.payload.password,
        image: action.payload.image,
        isLoggin: false,
      };
    }
    
    return state;
  };