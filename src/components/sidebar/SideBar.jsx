import { Alarm, History, Home, Print, Report, TrendingUp } from '@mui/icons-material'
import React from 'react'
import "./sidebar.css"
import {Link} from 'react-router-dom';

export default function SideBar() {
  return (
    <div className='sideBar'>
        <div className="sideBarWrapper">
          <div className="sideBarMenu">
            <h3 className="sideBarTitle">DASHBOARD</h3>
            <ul className="sideBarList">
              <Link className='link' to={"/"}>
                <li className="sidebarListItem">
                  <Home className='sidebarIcon'></Home>
                  Home
                </li>
              </Link>
              <Link className='link' to={"/trend"}>
                <li className="sidebarListItem">
                  <TrendingUp className='sidebarIcon'></TrendingUp>
                  Trend
                </li>
              </Link>
              <Link className='link' to={"/alarm"}>
                <li className="sidebarListItem">
                  <Alarm className='sidebarIcon'></Alarm>
                  Alarm
                </li>
              </Link>
              <Link className='link' to={"/report"}>
                <li className="sidebarListItem">
                  <Print className='sidebarIcon'></Print>
                  Report
                </li>
              </Link>
            </ul>
          </div>
        </div>
    </div>
  )
}
