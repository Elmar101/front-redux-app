import { loginAuth } from "../api/apiCalls";
import { ACTION_TYPE } from "./Constans";
import { signUp } from "./../api/apiCalls";

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
      isLoggin: authUser.isLoggin,
    },
  };
};

export const loginSuccessFnHandler = (credentials) => {
  return async (dispatch) => {
    const response = await loginAuth(credentials);
    dispatch(
      loginSuccessFn({
        username: response.data.username,
        displayname: response.data.displayname,
        password: response.data.password,
        image: response.data.image,
        isLoggin: false,
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
            password: body.password
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
