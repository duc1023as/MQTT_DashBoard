import React,{useState} from 'react';
import "./topbar.css";
import { Language, ViewSidebarRounded} from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SideBar from "../sidebar/SideBar";
import * as FaIcons from "react-icons/fa";
import {Link} from "react-router-dom";
import * as AiIcons from 'react-icons/ai';


export default function TopBar() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
  return (
    <div className='topBar'>
        <div className="topBarWrapper">
            <div className="topBarLeft">
                <FaIcons.FaBars className='topBarLeftIcon' onClick={showSidebar}></FaIcons.FaBars>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <SideBar></SideBar>
                </nav>
                <span className="topBarTitle">ADMIN</span>
            </div>
            <div className="topBarRight">
                <div className="topBarContainer">
                    <NotificationsNoneIcon></NotificationsNoneIcon>
                    <span className="topBarIcon">2</span>
                </div>
                <div className="topBarContainer">
                    <Language></Language>
                    <span className="topBarIcon">1</span>
                </div>
                <div className="topBarContainer">
                    <SettingsIcon></SettingsIcon>
                </div>
                <img src="data:image/png;base64,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"
                 alt="Avatar logo HCMUT" 
                 className="topBarimg" />
            </div>
        </div>
    </div>
  )
}
