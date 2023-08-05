import axios from '../../http'
import React, { useContext, useRef, useState } from 'react'
import { useEffect } from 'react'
import './Conversation.css'
import { AuthContext } from '../../context/Authcontext'

function Conversation({currentUser, conversations, socket}) {
    const [friend, setFriend] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const { unseenMessages } = useContext(AuthContext);
    const [countUnSeen, setCountUnSeen] = useState(0);

    // console.log(socket.current)
    useEffect(()=>{
        console.log(unseenMessages)
        const id = conversations._id;
        setCountUnSeen(unseenMessages[id]);
    }, [unseenMessages])
    // useEffect(()=>{
    //     // socket.current = (io('ws://localhost:8900'));
    //     socket.current.on("getMessage", data=>{
    //         console.log("message received")
    //         // setCountUnSeen(countUnSeen + 1);
    //     })
    // }, [])
    // console.log(unseenMessages)

    useEffect(()=>{
        const friendId = conversations.members.find((m)=> m !== currentUser._id);

        const getFriend = async()=>{
            try{
                const res = await axios.get('/users/userr?userId=' + friendId);
                setFriend(res.data);
            }catch(err){
                console.log("get friend conversation err");
            }
        }
        getFriend();
    }, [currentUser, conversations])
    // console.log(friend);

    return (
        <>
            {friend && <div className="conversation sidebarListItems chatItems">
                <div className='forChatItem'>
                    <img src={friend.ProfilePicture? friend.ProfilePicture : 'http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png'} alt="" className="conversationImg" />
                    <span className="conversationName">{friend.username}</span>
                </div>
                {countUnSeen > 0 && <div className='allmsgCount'>{countUnSeen}</div>}
            </div>}
        </>
    )
}

export default Conversation
