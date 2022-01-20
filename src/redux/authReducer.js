
const defaultState = {
    username: null,
    displayname: null,
    password: null,
    image: null,
    isLoggin: false,
}

export const authReducer = (state = {...defaultState}, action) => {
    console.log("LOGOUT-SUCCESS: " ,action)
    if (action.type === "logout-success") {
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