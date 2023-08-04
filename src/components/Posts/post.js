import React, { useState, useEffect, useContext } from 'react'
import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from 'react-textarea-autosize';
// import {Users} from '../../dummyData'
import axios from "../../http"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/Authcontext';


function Post({post}) {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like , setLike] = useState(post.likes.length)
    const [isLike , setIsLike] = useState(false)
    // console.log(`user id - ${post.userId}`);
    const {user:currentUser} = useContext(AuthContext)

    const [user, setUser] = useState({})
    useEffect(() => {                        // See documentation of useEffect
        const fetchUser = async()=>{
            const res = await axios.get(`/users/userr?userId=${post.userId}`)
            setUser(res.data);
        }
        fetchUser();
    },[post.userId])

    useEffect(()=>{
        setIsLike(post.likes.includes(currentUser?._id))
    }, [currentUser?._id , post.likes])

    const likeHandler = () =>{
        // const likeIcon = document.querySelector('.likeIcon')
        // const likeIcone = document.querySelector('.likeIcone')
        try{
            axios.put('/posts/' + post._id + '/like', {userId: currentUser._id})
        }catch(err){
            console.log(err)
        }
        setLike(isLike ? like-1 : like+1);
        setIsLike(!isLike)
    }

    return (
        <div className="PostContainor">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopleft">
                        <Link className="PostProfileLink" to={`/profile/${user.username}`}>
                            <img src={(user.ProfilePicture)?(PublicFolder+user.ProfilePicture):('http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png')} alt="" className="postprofileimg" />
                            <span className="postUserName">{user.username}</span>
                        </Link>
                        <span className="postTime">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon className="PostrightIcon"/>
                    </div>
                </div>
                <div className="postCenter">
                    <div className="postText">{post?.disc}</div>
                    <img src={PublicFolder + post.image} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postbottemleft">
                        <div className="postbottomIcons">
                            <FavoriteBorderIcon style={{display: isLike ? "none" : "block"}} className="likeIcon" onClick={likeHandler}/>
                            <FavoriteIcon style={{display: isLike ? "block" : "none"}} htmlColor="red" className="likeIcone" onClick={likeHandler}/>
                            {/* <img src="assets/Icons/Heart_Icon.png" alt="" className="likeIcone" /> */}
                            <ChatBubbleOutlineIcon className="CommentIcon"/>
                        </div>
                        <div className="postbottemtext">
                            <span className="postlikeCounter">{like} Likes</span>
                            <span className="postCommentCounter">{post.comment} Comments</span>
                            <hr className="postbottomHR"/>
                            <div className="commentSection">
                                <TextareaAutosize maxRows={5} placeholder="Add a Comment" className="commentBox" />
                                <span className="commentPost">POST</span>
                            </div>
                        </div>
                    </div>
                    <div className="postbottemRight">
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Post
