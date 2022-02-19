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
      //console.log("action payload",action.payload)
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

    else if (action.type === ACTION_TYPE.UPDATE_PROFILE_SUCCESS){
      const {displayname , image } = action.payload;
      return { ...state, displayname, image } 
    }
    
    
    return state;
  };