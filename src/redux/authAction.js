import { loginAuth } from "../api/apiCalls";
import { ACTION_TYPE } from "./Constans";
import { signUp, logout } from "./../api/apiCalls";

export const loginSuccessFn = (authUser) => {
  console.log(authUser);
  return {
    type: ACTION_TYPE.LOGIN_SUCCESS,
    payload: {
      token: authUser.token,
      username: authUser.user.username,
      displayname: authUser.user.displayName,
      image: authUser.user.image,
      password: authUser.password,
    },
  };
};

export const logoutSuccessFn = (authUser) => {
  return async (dispatch) => {
    const response = await logout();
    dispatch({
      type: ACTION_TYPE.LOGOUT_SUCCESS,
      payload: {
        username: authUser.username,
        displayname: authUser.displayname,
        password: authUser.password,
        image: authUser.image,
        isLoggin: authUser.isLoggin,
      },
    });
    return response;
  };
};

export const loginSuccessFnHandler = (credentials) => {
  return async (dispatch) => {
    const response = await loginAuth(credentials);
    dispatch(
      loginSuccessFn({
        ...response.data,
        password: response.data.password || credentials.password,
      })
    );
    return response;
  };
};

export const signUpSuccessFn = (body) => {
  return async (dispatch) => {
    const response = await signUp(body);
    dispatch(
      loginSuccessFnHandler({
        username: body.username,
        displayname: body.displayname,
        password: body.password,
      })
    );
    return response;
  };
};

/*/
Thunk diye bir Redux middleware özelliği kullanıyoruz. Ve burada return ettiğimiz değer,
bir fonksiyon olursa, thunk devreye girip, bu fonksiyonu çağırıyor. 
Ve parametre olarak "dispatch" i vererek bu fonksiyonu çağırıyor.
O nedenle, loginHandler içinde döndüğümüz fonksiyona dispatch parametresini ekliyoruz.
----------------------------------------------------------------------------------------
Bu loginHandler'ın döndüğü fonksiyon, redux tarafından çağırılıyor ve 
redux bunu yaparken parametre olarak, kendi dispatch fonksiyonunu parametre olarak veriyor.
/*/

export const updateProfileSuccess = (data) => {
  return {
    type: ACTION_TYPE.UPDATE_PROFILE_SUCCESS,
    payload: {
      displayname: data.displayname,
      image: data.image,
    },
  };
};
