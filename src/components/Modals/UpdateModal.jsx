import React, { useContext, useState } from 'react'
import './UpdateModalStyle.css'
import { AuthContext } from '../../context/Authcontext'
import axios from '../../http'

const UpdateModal = ({ setUpdateModal }) => {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER
    const { user, dispetch } = useContext(AuthContext)
    const [profile, setProfile] = useState(null)
    const [profileName, setProfileName] = useState(user.ProfilePicture)
    const [coverPicture, setCoverPicture] = useState(null)
    const [coverName, setCoverName] = useState(user.CoverPicture)

    const [formInputs, setFormInputs] = useState({
        username: user.username,
        city: user.city ? user.city : "",
        description: user.description ? user.description : "",
        from: user.from ? user.from : "",
        relationShip: user.relationShip ? user.relationShip : "",
      });
    const updateProfilePicture = (e) => {
        setProfile(e.target.files[0]);
        setProfileName(URL.createObjectURL(e.target.files[0]))
        console.log("file------" + e.target.files[0])
    }
    const updateCoverPicture = (e) => {
        setCoverPicture(e.target.files[0]);
        setCoverName(URL.createObjectURL(e.target.files[0]))
        console.log("file------" + e.target.files[0])
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInputs({
          ...formInputs,
          [name]: value,
        });
      };

    
      const handelSubmit = async(e) => {
        e.preventDefault();
        const updatedUser = {
            userId: user._id,
            username: formInputs.username.length >= 3 ? formInputs.username : user.username,
            city: formInputs.city,
            from: formInputs.from,
            description: formInputs.description,
            relationShip: formInputs.relationShip,
        }
        if (profile) {
            const data = new FormData();
            let filename = Date.now() + profile.name;
            data.append("name", filename);
            data.append("file", profile);
            updatedUser.ProfilePicture = filename;
            try {
                const res = await axios.post('/upload', data);
                updatedUser.ProfilePicture = res.data;
            } catch (err) {
                console.log("Upload error")
            }
        }
        if (coverPicture) {
            const data = new FormData();
            let filename = Date.now() + coverPicture.name;
            data.append("name", filename);
            data.append("file", coverPicture);
            updatedUser.CoverPicture = filename;
            try {
                const res = await axios.post('/upload', data);
                updatedUser.CoverPicture = res.data;
            } catch (err) {
                console.log("Upload error")
            }
        }
        try{
            const res = await axios.put(`/users/${user._id}`, updatedUser)
            dispetch({type: "USERUPDATE", payload: updatedUser});
            window.location.reload();
            setUpdateModal(false);
        }catch(err){
            console.log(err)
        }
      }

    return (
        <div className='u1'>
            <div className='u2'>
                <div className='u3'>
                    <div className='u4'>
                        <form onSubmit={handelSubmit}>
                            <label htmlFor="cover">
                                <img src={(coverName) ? (coverName) : ('http://res.cloudinary.com/dgsssyya9/image/upload/v1690720165/az3km4c2vgd8nykum9w6.jpg')} alt="" className="profileCoverImg" />
                                <input onChange={updateCoverPicture} style={{ display: "none" }} type="file" id="cover" name="cover" accept=".jpg, .png, .jpeg" />
                            </label>
                            <label htmlFor="profile">
                                <img src={(profileName) ? (profileName) : ('http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png')} alt="" className="profileMainImg" />
                                <input onChange={updateProfilePicture} style={{ display: "none" }} type="file" id="profile" name="profile" accept=".jpg, .png, .jpeg" />
                            </label>
                            <div className='UpdateInputContainor'>
                                <div className='UpdateInput'>
                                    <input disabled name='username' value={formInputs.username} className='updateInputField' type="text" placeholder=' '/>
                                    <label className='updateInputLabels' htmlFor="">UserName (Can not be change)</label>
                                </div>
                                <div className='UpdateInput'>
                                    <input name='city' value={formInputs.city} className='updateInputField' type="text" placeholder=' ' onChange={handleChange}/>
                                    <label className='updateInputLabels' htmlFor="">City</label>
                                </div>
                                <div className='UpdateInput'>
                                    <input name='description' value={formInputs.description} className='updateInputField' type="text" placeholder=' ' onChange={handleChange}/>
                                    <label className='updateInputLabels' htmlFor="">About</label>
                                </div>
                                <div className='UpdateInput'>
                                    <input name='from' value={formInputs.from} className='updateInputField' type="text" placeholder=' ' onChange={handleChange}/>
                                    <label className='updateInputLabels' htmlFor="">From</label>
                                </div>
                                <div className='UpdateInput'>
                                    <input name='relationShip' value={formInputs.relationShip} className='updateInputField' type="text" placeholder=' ' onChange={handleChange}/>
                                    <label className='updateInputLabels' htmlFor="">RelationShip</label>
                                </div>
                            </div>

                            <div className='updateButtons'>
                                <button className='CancelBtn' onClick={() => setUpdateModal(false)}>Cancel</button>
                                <button className='SubmitBtn' type='submit'>Save</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateModal