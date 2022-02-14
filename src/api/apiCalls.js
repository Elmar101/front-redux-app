import axios from "axios";

export const signUp = (body) => {
    return axios.post("api/1.0/users", body );
}

export const loginAuth = (creds) => {
    return axios.post("api/1.0/auth", {} ,{auth: creds}  );
}

export const changeLanguage = (language) =>{
    axios.defaults.headers['accept-language'] = language;
}

export const getUsers = (page = 0 , size = 3) => {
    return axios.get(`api/1.0/users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({username, password, isLoggin}) => {
    if(isLoggin){
        axios.defaults.headers['Authorization'] = `Basic ${btoa(username + ':' + password)}`;
    }else {
        delete axios.defaults.headers['Authorization'];
    }
}

export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`);
};

export const updateUser = (username,  displayname) => {
    return axios.put(`/api/1.0/users/${username}`, {displayName: displayname})
}