export const loginStart = (userCredentials) =>({
    type: "LOGIN_START",
});
export const loginSuccess = (user) =>({
    type: "LOGIN_SUCCESS",
    payload: user
});
export const loginFailure = (error) =>({
    type: "LOGIN_FAILURE",
    payload: error,
});
export const follow = (userId) =>({
    type: "FOLLOW",
    payload: userId,
});
export const unfollow = (userId) =>({
    type: "UNFOLLOW",
    payload: userId,
});
export const userUpdate = (userId) =>({
    type: "userUpdate",
    payload: userId,
});
export const setSeen = (conversationId) =>({
    type: "SETSEEN",
    payload: conversationId,
});
export const msgReceive = (conversationId) => ({
    type: "MSGRECEIVE",
    payload: conversationId,
})
export const logout = () =>({
    type: "LOGOUT"
});