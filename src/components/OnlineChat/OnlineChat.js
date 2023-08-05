import axios from '../../http'
import React, { useEffect, useState } from 'react'
import "./OnlineChat.css"

export const OnlineChat = ({onlineUsers, currentId, setCurrentChat}) => {
    const [friends, setFriends] = useState([])
    const [onlinefriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
        const getFriends = async() =>{
            const res = await axios.get('/users/friends/'+currentId);
            setFriends(res.data);
        }
        getFriends();
    }, [currentId])
    
    useEffect(()=>{
        setOnlineFriends(friends.filter((friend)=> onlineUsers.includes(friend._id)));
    }, [friends, onlineUsers])
    // console.log("--",onlinefriends);

    const handleClick = async(user) =>{
        try{
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
        }catch(err){
            console.log('online conversation err');
        }
    }
    return (
        <div className='chatOnline'>
            {onlinefriends.map((o)=>(
                <div className="chatOnlineFriends" key={o._id} onClick={()=> handleClick(o)}>
                    <div className="chatOnlinefdsImage">
                        <img src={o?.ProfilePicture? o?.ProfilePicture : 'http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png'} alt="" className="chatOnlineProImg" />
                        <span className="chatonlineBadge"></span>
                    </div>
                    <span className="chatOnlineName">{o?.username}</span>
                </div>
            ))}
        </div>
    )
}
