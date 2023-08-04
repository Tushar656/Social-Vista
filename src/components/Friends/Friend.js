import './Friend.css'

function Friend({friend}) {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="sidebarFriend">
            <img src={friend.ProfilePicture ? friend.ProfilePicture : 'http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png'} alt="" className="sidebarFriendimg" />
            <span className="sidebarFriendName">{friend.username}</span>
        </li>
    )
}

export default Friend
