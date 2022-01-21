export const loginSuccessFn = (authUser) => {
    return {
        type: "login-success",
        payload : {
            username: authUser.username,
            displayname: authUser.displayname,
            image: authUser.image,
            password: authUser.password
        }
    }
}

export const logoutSuccessFn = () => {
    return {
        type: "logout-success"
    }
}
