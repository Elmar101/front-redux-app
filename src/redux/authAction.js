import { ACTION_TYPE } from "./Constans";
export const loginSuccessFn = (authUser) => {
  return {
    type: ACTION_TYPE.LOGIN_SUCCESS,
    payload: {
      username: authUser.username,
      displayname: authUser.displayname,
      image: authUser.image,
      password: authUser.password,
    },
  };
};

export const logoutSuccessFn = (authUser) => {
  return {
    type: ACTION_TYPE.LOGOUT_SUCCESS,
    payload: {
      username: authUser.username,
      displayname: authUser.displayname,
      password: authUser.password,
      image: authUser.image,
      isLoggin: false,
    },
  };
};
