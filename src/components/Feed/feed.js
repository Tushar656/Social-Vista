import React, { useState, useEffect, useContext } from 'react'
import './feed.css'
import Share from '../share/share'
import Post from '../Posts/post'
// import {PostsData} from '../../dummyData'
// import axios from "axios"
import axios from "../../http"
import {AuthContext} from "../../context/Authcontext"

function Feed({username}) {
    const [posts, setPosts] = useState([])
    const [randomPosts, setRandomPosts] = useState([])
    const {user} = useContext(AuthContext)
    // console.log(user)

    useEffect(() => {                        // See documentation of useEffect
        const fetchPost = async()=>{
            const res = username 
            ? await axios.get("/posts/profile/"+username) 
            : await axios.get("/posts/timeline/" + `${user._id}`);
            // console.log("   ", res);
            setPosts(res.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)));
        }
        fetchPost();
    },[username, user?._id])
    useEffect(() => {                        // See documentation of useEffect
        const fetchPost = async()=>{
            if(user){
                const res = await axios.get("/posts/randomPosts/"+user._id)
                console.log("   ", res);
                setRandomPosts(res.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)));
            }
        }
        fetchPost();
    },[username, user?._id])


    return (
        <div className="Feed">
            <div className="feedWrapper">
                {(username === user?.username || !username) && <Share/>}
                {posts.map((p)=>{
                    return (<Post key={p._id} post={p}/>)
                })}
                {
                    randomPosts.map((p)=>{
                        return (!username && <Post key={p._id} post={p}/>)
                    })
                }
            </div>
        </div>
    )
}

export default Feed
