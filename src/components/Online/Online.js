import './Online.css'

function Online({user}) {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="OnlineFrnds">
            <div className="OnlineFrndsProfile">
                <img src={user.ProfilePicture ? user.ProfilePicture : 'http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png'} alt="" className="Onlineprofile" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="OnlineName">{user.username}</span>
        </li>
    )
}

export default Online
