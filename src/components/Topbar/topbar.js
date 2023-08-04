import './topbar.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chat from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/Authcontext'
import axios from '../../http';

function TopBar() {
    const { user, dispetch } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [search, setSearch] = useState([]);
    const [dotClicked, setDotCliked] = useState(false);
    const dotClickHendler = () =>{
        dotClicked ? setDotCliked(false) : setDotCliked(true);
    }
    const HendelLogout = () =>{
        dispetch({type: "LOGOUT"});
    }
    const HendelSearch = (e) => {
        e.preventDefault();
        // console.log("Search function called");
        let val = e.target.value;
        if(val.length > 2){
            const fetchUser = async()=>{
                const res = await axios.get(`/users/search?username=${val}`)
                setSearch(res.data);
            }
            fetchUser();
        }else{
            setSearch([])
        }
    }

    return (
            <div className="topBarContainor">
                <div className="topBarLeft">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span className="logo">SocialVista</span>
                    </Link>
                </div>
                <div className="topBarCenter">
                    <div className="searchBar" style={{borderBottomLeftRadius: `${search.length > 0 ? '0px' : '20px'}`, borderBottomRightRadius: `${search.length > 0 ? '0px' : '20px'}`}}>
                        <div className='searchBarI'>
                            <SearchIcon className="searchIcon" />
                            <input type="text" 
                                placeholder="Search" 
                                onChange={HendelSearch}
                            />
                        </div>
                        <div className='searchedItems'>
                            {search.map((val) => (
                                <Link to={`/profile/${val.username}`} style={{ textDecoration: 'none' }}>
                                    <div className="searchItem">{val.username}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="topBarRight">
                    <div className="topBarLinks">
                        <span className="topBarLink">Homepage</span>
                        <span className="topBarLink">Timeline</span>
                    </div>
                    <div className="topbarIconBox">
                        <div className="topBarIcons">
                            <PersonIcon />
                            <span className="topBarIconBadge">1</span>
                        </div>
                        <div className="topBarIcons">
                            <Chat />
                            <span className="topBarIconBadge">14</span>
                        </div>
                        <div className="topBarIcons">
                            <NotificationsIcon />
                            <span className="topBarIconBadge">1</span>
                        </div>
                    </div>
                    {user ? (<div className="topbarProfileinfo">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.ProfilePicture ? PF + user.ProfilePicture : 'http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png'} alt="" className="topBarImage" />
                        </Link>
                        <div className='topbarArrow' onClick={dotClickHendler}><MoreVertIcon />
                            {dotClicked && <div className="settingBox">
                                <Link to={`/profile/${user.username}`} style={{color: "inherit", textDecoration: "none"}}>
                                    <div className="BoxprofileSection">
                                        <img src={user.ProfilePicture ? PF + user.ProfilePicture : 'http://res.cloudinary.com/dgsssyya9/image/upload/v1690719882/l3ne7oanlrxx1xovf3lf.png'} alt="" className="BoxProfile" />
                                        <div className="boxProfileName">
                                            <h3>{user.username}</h3>
                                            <h5>See Your Profile</h5>
                                        </div>
                                    </div>
                                </Link>
                                <div className="BoxprofileSection" onClick={HendelLogout}>
                                    <div className="logouticonsec">
                                        <LogoutIcon className='logoutIcon'/>
                                    </div>
                                    <div className="boxProfileName">
                                        <h3>Logout</h3>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>) : (
                        <Link to="/" className='loginBtn' style={{ textDecoration: 'none' }}>
                            <h3 style={{marginRight: '5px'}}>Login</h3>
                            <LoginIcon/>
                        </Link>
                    )}
                </div>
            </div>

    )
}

export default TopBar
