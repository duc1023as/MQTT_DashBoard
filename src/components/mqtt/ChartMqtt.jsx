import React from 'react';
import * as mqtt from 'react-paho-mqtt';
import moment from "moment";
import "./chartmqtt.css";
import {
    BarChart,
    Bar,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
  } from 'recharts';



export default function ChartMqtt() {
    const [ client, setClient ] = React.useState(null);
    const [ isConnect, setIsConnect] = React.useState(false);
    const [ isSub, setIsSub] = React.useState([false]);
    const [ status, setStatus] = React.useState(null);
    const [ statusM1, setStatusM1] = React.useState(null);
    const _topic = ["Temp","Motor"];
    const _options = {};
    const [data,setData] = React.useState({
        nhietdo:0,
    });
    const [dataMotor1, setDataMotor1] = React.useState([{
      "motor1":0,
    }])
    const [listData,setListData] = React.useState([
      {
        "nhietdo":0,
        "time":0,
      }
    ]);

    const [axis,setAxis] = React.useState([1480,380]);
  
    React.useEffect(() => {
      _init();
    },[])

    React.useEffect(()=>{
        console.log(Date.now());
        listData.push({
          "nhietdo":parseInt(data["nhietdo"]),
          "time":moment().format('YYYY/MM/D hh:mm:ss'),
        });// clear SSS
        console.log(listData);
        setListData([...listData]);
        _displayStatus();
    },[data]);


    React.useEffect(()=>{
      // console.log('render');
  },[isSub]);
  
    const _init = () => {
      const c = mqtt.connect("192.168.1.200",
        Number(8000),
        "1235", 
        _onConnectionLost,
        _onMessageArrived);
        // mqtt.connect(host, port, clientId, _onConnectionLost, _onMessageArrived)
      setClient(c);
    }
  
    // called when sending payload
    const _sendPayloadMotor1On = () => {
      const payload = mqtt.parsePayload("Motor", '{"motor1":1}'); // topic, payload
      client.send(payload);
    }
    const _sendPayloadMotor1Off = () => {
      const payload = mqtt.parsePayload("Motor", '{"motor1":0}'); // topic, payload
      client.send(payload);
    }
  
    // called when client lost connection
    const _onConnectionLost = responseObject => {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
      }
    }
  
    // called when messages arrived
    const _onMessageArrived = message => {
      // try{

        console.log("onMessageArrived: " + message.payloadString);
        try{

          let value = JSON.parse(message.payloadString);
          console.log(value);
          if(value["motor1"]===1 || value["motor1"] === 0){
            setDataMotor1(value)
          }
          else{
            setData(value);
          }
        }
        catch{
          alert("Message Error in topic");
        }
      // }
      // catch{

      // }
    }
  
  
    // called when subscribing topic(s)
    const _onSubscribe = () => {
      try{
        if(isConnect === false){
          console.log(_topic.length);
          client.connect({ onSuccess: () => {
            for (var i = 0; i < _topic.length; i++) {
              client.subscribe(_topic[i], _options);
            }}
          }); // called when the client connects
        setIsConnect(true);
        console.log(isSub+ 'onSub');
        }
        else{
          for (var i = 0; i < _topic.length; i++) {
            client.subscribe(_topic[i], _options);
          }
        }
        setIsSub(true);
      }
      catch{

      }
    }
    // called when subscribing topic(s)
    const _onUnsubscribe = () => {
      console.log(_topic.length);
      for (var i = 0; i < _topic.length; i++) {
        client.unsubscribe(_topic[i], _options);
      }
      setIsSub(false); // called when the client connects
      console.log("UnSub");
      console.log(isSub+ 'onUnSub');
    }
  
    // called when disconnecting the client
    const _onDisconnect = () => {
      client.disconnect();
    }

    const _displayStatus = () => {
      if(data.nhietdo > 30 || data.nhietdo < 0) {
        setStatus('Bad');
      }
      else{
        setStatus('Good');
      }
    }
    return (
      <>
      <div className="widget">
        <div className="widgetMqttList">
          <div className="widgetMqttTempTitleList">
            <span className="widgetTitle">TEMPERATURE</span>
            <span className="widgetTempValue">{data["nhietdo"]}°C</span>
          </div>
          <div className="widgetMqttTempsStatus">
            <span className="widgetTitleStatus">STATUS</span>
            <span className={status === 'Good'?'statusGood':'statusBad'} >{status}</span>
          </div>
        </div>
        <div className="widgetMqttList">
           <div className="widgetMqttMotor1Title"> 
             <span className="widgetMqttM1Title">MOTOR 1</span>
          </div>
          <div className="widgetMqttMotor1StatusList">
            <div className="widgetMqttMotor1Contain">
              <span className={dataMotor1["motor1"] === 1 ? 'M1StasusOn' : 'M1StatusOff'}>{dataMotor1["motor1"] === 1 ? 'ON' : 'OFF'}</span> 
            </div>
            <div className="buttonM1">
              <button className='m1Start' onClick={_sendPayloadMotor1On}>START</button>
              <button className="m1Stop" onClick={_sendPayloadMotor1Off}>STOP</button>
            </div> 
          </div> 
        </div>
      </div>
      <div className="chartMqtt">
        <div className="chartMqttTitle">
          <span className="mqttTitle">Realtime Trend</span>
          <div className="buttonMqtt">
            <button className='btnConnect' onClick={_onSubscribe}> <span className='titleButton'>CONNECT</span> </button>
            <button className='btnDisconnect' onClick={_onUnsubscribe}> <span className='titleButton'>DISCONNECT</span> </button>
          </div>
        </div>
        <LineChart width={axis[0]} height={axis[1]} data={listData} >
            <XAxis label={{ value:"Time", offset:-5, position:"insideBottom"}} dataKey='time' />
            <YAxis label={{ value: 'Temperature', angle: -90, position: 'insideLeft' }} dataKey='nhietdo'/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip></Tooltip>
            <Line dataKey='nhietdo' type="monotone" stroke="#111111" activeDot={{r: 8}} dot={false} />
        </LineChart>
      </div>
      </>
    );
}
