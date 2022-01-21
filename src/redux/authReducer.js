
const defaultState = {
    username: null,
    displayname: null,
    password: null,
    image: null,
    isLoggin: false,
}

export const authReducer = (state = {...defaultState}, action) => {
    if (action.type === "login-success") {
        return {
          ...state,
          username: action.payload.username,
          displayname: action.payload.displayname,
          password: action.payload.password,
          image: action.payload.image,
          isLoggin: true,
        };
    }
    else if (action.type === "logout-success") {
      return {
        ...state,
        username: null,
        displayname: null,
        password: null,
        image: null,
        isLoggin: false,
      };
    }
    
    return state;
  };