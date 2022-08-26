import React, { useState,useEffect } from 'react';
import "./chart.css";
import {API} from "../../data/API/API_URL";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ZAxis} from 'recharts';

export default function Chart() {
    const [data,setData] = useState([]);
    const [selectedOption,setSelectedOption] = useState('Montrose Beach');
    const options = [
        '63rd Street Beach',
        'Calumet Beach',
        'Montrose Beach',
        'Ohio Street Beach',
        'Osterman Beach',
        'Rainbow Beach'
    ];
    const getData = (beach) => {
        if(beach === "All"){
          fetch(API.URL+'Sensor/30')
              .then(response => response.json())
              .then((data)=>{setData(data);})
              .catch((e)=> console.log(e));
        }
        else{
           fetch(API.URL+'Sensor/30,'+beach)
           .then(response => response.json())
           .then((data)=>{setData(data);})
           .catch((e)=> console.log(e));
        }
      }
      useEffect(()=>{
        getData(selectedOption);
      },[selectedOption])

      console.log('Chart');
      console.log(data);

  return (
    <div className='chart'>
      <div className="chartTop">
        <img src="https://img.freepik.com/premium-vector/thermometer-icon-temperature-symbol-emblem-vector-illustration_231786-4041.jpg?w=2000"
         alt="Temperature Icon" 
         className="temperatureImg" />
        <span className="temperatureTitle">TEMPERATURE TREND</span>
      </div>
      <div className="chartContain">
        <div className="chartContainTop">
          <span className="chartLocate">Location</span>
          <ComboBox className='comboboxChart'
          options={options}
          placeholder="Choose Beach"
          defaultIndex={4}
          optionsListMaxHeight={300}
          style={{
          width: "350px",
          paddingTop:"5px",
          marginLeft:"40px"
          }}
          focusColor="#20C374"
          renderOptions={(option) => (
          <div className="comboBoxOption">{option}</div>
          )}
          onSelect={(option) =>{setSelectedOption(option)}
          }
          onChange={(event) => {
              console.log(event.target.value);
              }}
          enableAutocomplete
          />
        </div>
        <div className="chartContainBottom">
          <span className="chartTemperatureTitle">Temperature Of {selectedOption}</span>
          <ResponsiveContainer className="reChartTemperature" height={420}>
              <LineChart 
              width={600} 
              height={600} 
              data={data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
              <XAxis label={{ value:"Time", offset:-5, position:"insideBottom" }}dataKey="Measurement_Timestamp_Label"></XAxis>/
              <YAxis label={{ value: 'Temperature', angle: -90, position: 'insideLeft' }} dataKey="Water_Temperature"/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Line type="monotone" dataKey="Water_Temperature" stroke="#8884d8" activeDot={{r: 8}} dot={false} />
              </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
