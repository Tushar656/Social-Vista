import React, { useContext, useEffect, useState } from 'react'
import './profile.css'
import TopBar from '../../components/Topbar/topbar'
import Feed from '../../components/Feed/feed';
import Rightbar from '../../components/RightBar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from '../../http';
import {useParams} from "react-router-dom"
import { AuthContext } from '../../context/Authcontext';
import UpdateModal from '../../components/Modals/UpdateModal';


function Profile() {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const params = useParams();
    const {user: currentUser, dispetch} = useContext(AuthContext);
    // console.log(params);                  // In App.js we write profile/:username

    const [user, setUser] = useState({})
    const [profile, setProfile] = useState({})
    const [coverPicture, setCoverPicture] = useState({})
    const [updateModal, setUpdateModal] = useState(false)
    useEffect(() => {                        // See documentation of useEffect
        const fetchUser = async()=>{
            const res = await axios.get(`/users/userr?username=${params.username}`)
            // console.log(currentUser)
            // console.log(res.data)
            setUser(res.data);
        }
        fetchUser();
    },[params.username])
    // console.log("----",user)


    return (
        <div>
            <TopBar />
            {
                updateModal && <UpdateModal setUpdateModal={setUpdateModal}/>
            }
            <div className="profileContainor">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="ProfileCover">
                            {
                                currentUser?._id === user?._id ? (
                                    <div>
                                        <img onClick={() => setUpdateModal(true)} src={(user.CoverPicture)?(user.CoverPicture):('http://res.cloudinary.com/dgsssyya9/image/upload/v1690720165/az3km4c2vgd8nykum9w6.jpg')} alt="" className="profileCoverImg" />
                                        <img onClick={() => setUpdateModal(true)} src={(user.ProfilePicture)?(user.ProfilePicture):('http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png')} alt="" className="profileMainImg" />
                                    </div>
                                ) : (
                                    <div>
                                        <img src={(user.CoverPicture)?(user.CoverPicture):('http://res.cloudinary.com/dgsssyya9/image/upload/v1690720165/az3km4c2vgd8nykum9w6.jpg')} alt="" className="profileCoverImg" />
                                        <img src={(user.ProfilePicture)?(user.ProfilePicture):('http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png')} alt="" className="profileMainImg" />
                                    </div>
                                )
                            }
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.description ? user.description : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores, in.'}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={params.username}/>
                        <Rightbar user={user}/> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
