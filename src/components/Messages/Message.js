import React, { useEffect } from 'react'
import "./Message.css"
import {format} from 'timeago.js'
import axios from '../../http';
import { useState } from 'react';

function Message({messages, own}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [Sender, setSender] = useState(null)
    useEffect(()=>{
        const getId = async()=>{
            const res = await axios.get('/users/userr?userId='+messages.sender);
            setSender(res.data)
            // console.log(res.data);
        }
        getId();
    }, messages)
    return (
        <>
            <div className={own? "messagecontainor own": "messagecontainor"}>
                <div className="messageTop">
                    <div className="messageProfile">
                        {Sender && <img src={Sender.ProfilePicture? PF + Sender.ProfilePicture : 'http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png'} alt="" />}
                    </div>
                    <div className="messageMain">{messages.text}</div>
                </div>
                <div className="messagetime">{format(messages.createdAt)}</div>
            </div>
        </>
    )
}

export default Message
