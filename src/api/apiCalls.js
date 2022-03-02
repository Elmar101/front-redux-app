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

export const updateUser = (username,  data) => {
    return axios.put(`/api/1.0/users/${username}`, data )
}

export const setPostText = (body) => {
    return axios.post("api/1.0/texts", body );
}

export const getPostTexts = (username,page=0) => {
    const apiPath = username ? `/api/1.0/users/${username}/texts?page=`: '/api/1.0/texts?page=';
    return axios.get(apiPath + page); 
}

export const getOldTexts = id => {
    return axios.get('/api/1.0/texts/' + id);
};

export const getOldHoaxes = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/texts/${id}` : `/api/1.0/texts/${id}`;
    return axios.get(path);
}; 

export const getNewTextCount = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/texts/${id}?count=true` : `/api/1.0/texts/${id}?count=true`;
    return axios.get(path);
};

export const getNewTexts = (id,username) => {
  const path = username ? `/api/1.0/users/${username}/texts/${id}?direction=after` : `/api/1.0/texts/${id}?direction=after`;
  return axios.get(path); 
};

export const postTextAttachment = attachment => {
    return axios.post('/api/1.0/texts-attachments', attachment);
};

export const deleteTexts =(id)=> {
    return axios.delete(`/api/1.0/texts/${id}`);
}; 