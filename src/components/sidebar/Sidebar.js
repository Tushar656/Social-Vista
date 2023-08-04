import React, { useContext, useEffect, useState } from 'react'
import './Sidebar.css'
import Friend from '../Friends/Friend';

import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/Authcontext';
import axios from '../../http';

function Sidebar() {
    const { unseenMessages } = useContext(AuthContext);
    const [countUnSeen, setCountUnSeen] = useState(0);
    const [randomUsers, setRandomUsers] = useState([]);
    useEffect(()=>{
        setCountUnSeen(() => Object.values(unseenMessages).reduce((sum, value) => sum + value, 0))
    }, [unseenMessages])

    useEffect(() => {                        // See documentation of useEffect
        const fetchPost = async()=>{
            const res = await axios.get("/users/randomUsers/") 
            console.log("   ", res.data);
            setRandomUsers(res.data);
        }
        fetchPost();
    },[])

    return (
        <div className="SideBar">
            <div className="SidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItems">
                        <RssFeedIcon htmlColor="rgb(20, 157, 255)" className="sidebarIcon"/>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <Link to={"/messanger"} style={{textDecoration:'none'}}>
                        <li className="sidebarListItems chatItems">
                            <div className='forChatItem'>
                                <ChatIcon htmlColor="rgb(29, 255, 25)" className="sidebarIcon"/>
                                <span className="sidebarListItemText">Chats</span>
                            </div>
                            {countUnSeen > 0 && <div className='allmsgCount'>{countUnSeen}</div>}
                        </li>
                    </Link>
                    <li className="sidebarListItems">
                        <PlayCircleIcon htmlColor="rgb(255, 20, 95)" className="sidebarIcon"/>
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItems">
                        <GroupsIcon htmlColor="rgb(122,11,200)" className="sidebarIcon"/>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItems">
                        <BookmarkIcon htmlColor="rgb(12,100,233)" className="sidebarIcon"/>
                        <span className="sidebarListItemText">BookMarks</span>
                    </li>
                    <li className="sidebarListItems">
                        <HelpOutlineIcon htmlColor="red" className="sidebarIcon"/>
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItems">
                        <WorkIcon htmlColor="rgb(63 104 162)" className="sidebarIcon"/>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItems">
                        <EventIcon htmlColor="rgb(0, 207, 203)" className="sidebarIcon"/>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItems">
                        <SchoolIcon htmlColor="red" className="sidebarIcon"/>
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                    <li className="sidebarListItems">
                        <KeyboardArrowDownIcon htmlColor="black" className="sidebarIcon"/>
                        <button className="sidebarBtn">Show More</button>
                    </li>
                </ul>
                <hr className="sidebarHR"/>
                <ul className="sidebarFriendList"> 
                    {
                        randomUsers.map((u)=>(
                            <Link key={u._id} to={'/profile/'+u.username} className="FriendLink"><Friend friend={u}/></Link>
                        ))
                    }                 
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
