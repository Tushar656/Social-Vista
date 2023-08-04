import React from 'react'
import './Home.css'
import TopBar from '../../components/Topbar/topbar'
import Feed from '../../components/Feed/feed';
import Rightbar from '../../components/RightBar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';

function Home() {
    return (
        <div>
            <TopBar/>
            <div className="homeContainor">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </div>
    )
}

export default Home
