import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";
import axios from '../http'

const Initial_State = {
    // user: {                             // NEW
    //     _id: '61c857be71d8b3165d8e103d',
    //     username: "Tushar",
    //     email: "tushar@gmail.com",
    //     password: "$2b$10$H8DDWN3E2XHbxFxEQ3rrEesKRyPbznVtQrM1kzR5M7B.wH2NyOaCi",
    //     ProfilePicture: "profiles/pro7.jpg",
    //     CoverPicture: "",
    //     followers: [],
    //     followeing: ["61c89af4daf4d865ad6c5854", "61cb3a09f6b64290b533111f"],
    //     isAdmin: false
    // },
    user: JSON.parse(localStorage.getItem("smUser")) || null,
    isFetching : false,
    error: false,
    unseenMessages: {}
}

export const AuthContext = createContext(Initial_State);

export const AuthContextProvider = ({children}) =>{
    const [state, dispetch] = useReducer(AuthReducer, Initial_State);
    useEffect(()=>{
        localStorage.setItem("smUser", JSON.stringify(state.user))
    }, [state.user])

    const [unseenMessages, setUnseenMessages] = useState({});
    useEffect(()=>{
        const fetchUnseenMessages = async () => {
            try {
              const response = await axios.get('messages/all/count/' + state.user._id);
              const data = await response.data;
    
              const updatedUnseenMessages = {};
          
              data.forEach(({ conversationId, messageCount }) => {
                updatedUnseenMessages[conversationId] = messageCount;
              });
          
              setUnseenMessages(updatedUnseenMessages);
            } catch (error) {
              console.log(error)
            }
          };
          
          fetchUnseenMessages();
    }, [state])
    return (
        <AuthContext.Provider
        value={{
            user : state.user,
            isFetching : state.isFetching, 
            error : state.error,
            unseenMessages : unseenMessages,
            dispetch,
        }}
        >
        {children}
        </AuthContext.Provider>
    )
}
