import React, { useContext, useEffect, useState } from 'react'
import './Rightbar.css'
import { Users } from '../../dummyData'
import Online from '../Online/Online'
import axios from '../../http'
import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/Authcontext'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MessageIcon from '@mui/icons-material/Message';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

function Rightbar({user}) {
    const [randomUsers, setRandomUsers] = useState([]);

    useEffect(() => {                        // See documentation of useEffect
        const fetchPost = async()=>{
            const res = await axios.get("/users/randomUsers/") 
            console.log("   ", res.data);
            setRandomUsers(res.data);
        }
        fetchPost();
    },[])

    const HomeRightBar = () => {
        return (
            <>
                <div className="BDcontainor">
                    <img src="assets/gift.png" alt="" className="bdIMG" />
                    <span className="BDtext">
                        <b>Raj</b> and <b>3 other friends</b> have birthday today.
                    </span>
                </div>
                <div className="addContainor">
                    <img src="assets/add.jpg" alt="" className="addvtisment" />
                </div>
                <div className="rightMainContainor">
                    <h4 className="rightTitle">Online Friends</h4>
                    <ul className="OnlineFrndList">
                        {
                            randomUsers.map((u) => (
                                <Link key={u._id} to={'/profile/'+u.username} className="FriendLink"><Online user={u} /></Link>
                            ))
                        }
                    </ul>
                </div>
            </>
        )

    }




    const ProfileRightBar = () => {
        const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
        const [frineds , setFriends] = useState([])
        const {user: currentUser, dispetch} = useContext(AuthContext);
        useEffect(()=>{
            const getFriends = async()=>{
                // console.log("--",user)
                try{
                    const friendList = await axios.get('/users/friends/'+ user._id);
                    // console.log(friendList.data)
                    setFriends(friendList.data);
                }catch(err){
                    console.log(err)
                }
            }
            getFriends();
        }, [user]);

        const [followed, setFollowed] = useState(currentUser && currentUser.followeing.includes(user._id));
        useEffect(()=>{
            if(currentUser) setFollowed(currentUser.followeing.includes(user._id))
        }, [currentUser, user._id] )
        const followHendeler = async() =>{
            try{
                if(!followed){
                    await axios.put('/users/' + user._id + '/follow', {userId: currentUser._id});
                    dispetch({type: "FOLLOW", payload: user._id});
                }else{
                    await axios.put('/users/' + user._id + '/unfollow', {userId: currentUser._id})
                    dispetch({type: "UNFOLLOW", payload: user._id});
                }
            }catch(err){
                console.log("Follow error", err)
            }
            setFollowed(!followed)
        }


        const MessageHendeler = async() => {
            try{
                const conver = await axios.get('/conversations/'+currentUser._id, {SenderId: currentUser._id, reciverId: user._id});
                console.log(conver.data);
                const isConversationExist = conver.data.some((obj) => obj.members.includes(user._id));
                console.log(isConversationExist)

                if(!isConversationExist){
                    await axios.post('/conversations/', {SenderId: currentUser._id, reciverId: user._id});
                }
                window.location.href="/messanger";
            }catch(err){
                console.log("Message error")
            }
        }

        return (
            <>
                {currentUser && user.username !== currentUser.username && (
                    <div className="rightBarBtns">
                        <button className="rightBarFollowBtn" onClick={followHendeler}> 
                            {followed? "Unfollow" : "Follow"}
                            {followed? <RemoveIcon/> : <AddIcon/>}
                        </button>
                        <button className="rightBarMessageBtn" onClick={MessageHendeler}> 
                            <span>Message</span>
                            <ChatBubbleOutlineIcon />
                        </button>
                    </div>
                )}
                <h4 className="rpTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City : </span>
                        <span className="rightbarInfoValue">{user.city} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From : </span>
                        <span className="rightbarInfoValue">{user.from} </span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship : </span>
                        <span className="rightbarInfoValue">{user.relationShip} </span>
                    </div>
                </div>
                <h4 className="rpTitle">User Friends</h4>
                {<div className="rightbarFollowings">
                        {
                            frineds.map((friend)=>(
                                <Link key={friend._id} to={'/profile/'+friend.username} className="FriendLink">
                                    <div className="rightBarFollowing" key={friend._id}>
                                        <img src={friend.ProfilePicture ? PublicFolder+friend.ProfilePicture : PublicFolder+'profiles/DefProfile.png'} alt="" className="rpFollowingImg" />
                                        <span className="rpFollowingName">{friend.username}</span>
                                    </div>
                                </Link>
                                ))
                        }
                </div>}
            </>
        )
    }





    return (
        <div className="RightBar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar/> : <HomeRightBar/>}
            </div>
        </div>
    )
}

export default Rightbar
