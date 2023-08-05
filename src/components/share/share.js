import React, { useContext, useRef, useState } from 'react'
import './share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import TextareaAutosize from 'react-textarea-autosize';
import { AuthContext } from "../../context/Authcontext"
import axios from "../../http"

function Share() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef()

    const [file, setFile] = useState(null)

    const submitHandeler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            disc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            let filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.image = filename;
            try {
                const res = await axios.post('/upload', data);
                newPost.image = res.data;
                window.location.reload();
            } catch (err) {
                console.log("Upload error")
            }
        }

        try {
            await axios.post('/posts', newPost);
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="shareContainor">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.ProfilePicture ? user.ProfilePicture : 'http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png'} alt="" className="shareImg" />
                    <TextareaAutosize ref={desc} className="shareInput" placeholder={"What's in your mind " + user.username + "?"} />
                </div>
                <hr className="ShareHR" />
                {file && (
                    <div className="sharepostfile">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImage" />
                        <CancelIcon className="cancleImg" onClick={() => setFile(null)} />
                    </div>
                )}

                <form className="shareBottom" onSubmit={submitHandeler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className="ShareIcon" />
                            <span className="shareText">Photo or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" name="file" accept=".jpg, .png, .jpeg" onChange={(e) => { setFile(e.target.files[0]); console.log("file--" + e.target.files[0].name) }} />
                        </label>
                        <div className="shareOption">
                            <LabelIcon htmlColor="blue" className="ShareIcon" />
                            <span className="shareText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <RoomIcon htmlColor="green" className="ShareIcon" />
                            <span className="shareText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor="gold" className="ShareIcon" />
                            <span className="shareText">Feelings</span>
                        </div>
                    </div>
                    <button className="sharebtn" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share


