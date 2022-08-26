import React from 'react';
import ChartMqtt from '../../components/mqtt/ChartMqtt';
import "./home.css";


export default function Home() {
  return (
    <div className='home'>
      <div className="homeTitle">
        <img src="https://icon-library.com/images/icon-dashboard/icon-dashboard-9.jpg"
         alt="DashBoard Icon" 
         className="dashboardIcon" />
         <span className="dashboardTitle">DASHBOARD</span>
      </div>
      <div className="homeCotain">
        <ChartMqtt></ChartMqtt>
      </div>
    </div>
  )
}
