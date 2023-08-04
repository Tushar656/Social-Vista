import {React, useState, useEffect, useContext, useRef} from 'react';
import Conversation from '../conversation/Conversation';
import Message from '../Messages/Message';
import TopBar from '../Topbar/topbar';
import './Messanger.css';
import TextareaAutosize from 'react-textarea-autosize';
import { OnlineChat } from '../OnlineChat/OnlineChat';
import { AuthContext } from '../../context/Authcontext';
import axios from '../../http';
import {io} from 'socket.io-client';

export default function Messanger() {
    const [conversation, setConversation] = useState([]);
    const {user} = useContext(AuthContext);
    const [arrivalmessages, setArrivalmessages] = useState(null);
    const [onlineusers, setOnlineusers] = useState([]);
    const { dispetch } = useContext(AuthContext);
    
    const socket = useRef()
    // console.log(socket.current)

    useEffect(()=>{
        // socket.current = (io('ws://localhost:8900'));
        socket.current = (io('wss://social-vista-socket-server.glitch.me/'));
        socket.current.on("getMessage", data=>{
            console.log("message Receiver")
            setArrivalmessages({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
            dispetch({type: "MSGRECEIVE", payload: data.ConversationID});
            // setUnSeen(prevState => ({
            //     ...prevState,
            //     [data.ConversationID]: prevState[data.ConversationID] + 1
            // }));
        })
    }, [])

    useEffect(() => {
        const getConversations = async()=>{
            try{
                const res = await axios.get('/conversations/' + user?._id);
                setConversation(res.data);
                // console.log(res);
            }catch(err){
                console.log("Get Conversation err")
            }
        }
        getConversations();
    }, [user])

    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    // console.log(currentChat)

    useEffect(()=>{
        const getMessages = async()=>{
            try{
                const res = await axios.get('/messages/' + currentChat?._id);
                setMessages(res.data);
            }catch(err){
                console.log("Get Messages error")
            }
        }
        getMessages();
    }, [currentChat]);
    // console.log(currentChat)

    const [newMessage, setNewMessage] = useState("");
    const sendhandler = async() =>{
        // e.preventDefault();
        const message = {
            sender : user._id,
            text : newMessage,
            ConversationID : currentChat._id,
        }
        const recieverId = currentChat.members.find(
            (member) => member !== user._id
        )
        socket.current.emit("sendMessage", {
            senderId: user._id,
            recieverId, 
            text: newMessage,
            ConversationID: currentChat._id,
        })
        try{
            const res = await axios.post('/messages', message);
            setMessages([...messages, res.data]);
            setNewMessage(""); 
        }catch(err){
            console.log("Send hendler error");
        }
    }
    
    const scrollRef = useRef();
    useEffect(()=>{
        // scrollRef.current?.scrollIntoView({behavior: "smooth"});
        scrollRef.current?.scrollIntoView();
    }, [messages]) 

    useEffect(()=>{
        arrivalmessages && currentChat?.members.includes(arrivalmessages.sender) &&
        setMessages(pre => [...pre, arrivalmessages]);
    }, [arrivalmessages, currentChat]);

    useEffect(()=>{
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users)=>{
            // console.log(users);
            setOnlineusers(user.followeing.filter((f)=> users.some((u) => u.userId === f)));
        })
    }, [user])

    const openChat = (c) => {
        setCurrentChat(c);
        try{
            // console.log(c._id)
            // console.log(unseenMessages)
            axios.put(`/messages/read/${c._id}`)
            dispetch({type: "SETSEEN", payload: c._id});
        }catch(err){
            console.log("Open chat err")
        }
    }

    return (
        <>
            <TopBar/>
            <div className="messanger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder='Search for friends' className='chatMenuInput' />
                        {conversation.map((c)=>(
                            <div onClick={()=>openChat(c)} key={c._id}>
                                <Conversation currentUser={user} conversations={c} socket={socket}/>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat?<><div className="chatboxtop">
                            {messages.map((mes)=>(
                                <div ref = {scrollRef} key={mes._id}>
                                    <Message messages={mes} own={mes.sender === user._id}/>
                                </div>
                            ))}
                        </div>
                        {/* <form onSubmit={newMessage? sendhandler : ()=>{}}>
                            <TextareaAutosize className="sendmessageInput" placeholder={"Message"} value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}}/>
                            <button className="sendmessagebtn" type='submit'>Send</button>
                        </form> */}
                        <div className="chatboxbottom">
                            <TextareaAutosize onKeyDown={(e) => e.keyCode === 13 && newMessage? sendhandler() : ()=>{}} className="sendmessageInput" placeholder={"Message"} value={newMessage} onChange={(e)=>{setNewMessage(e.target.value)}}/>
                            <button className="sendmessagebtn" onClick={newMessage? sendhandler : ()=>{}}>Send</button>
                        </div>
                        </> : <span className='NoConversation'>Open Conversation to Start Chat</span>}
                    </div>
                </div>

                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <OnlineChat onlineUsers={onlineusers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                    </div>
                </div>
            </div>
        </>
    )
}
