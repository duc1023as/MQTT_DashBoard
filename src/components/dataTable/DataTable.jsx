import React,{useEffect, useState} from 'react';
import {API} from "../../data/API/API_URL";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import "./datatable.css";
import { DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';

export default function DataTable() {
    const [dataTable,setDataTable] = useState([]);
    const [selectedOption,setSelectedOption] = useState("All");
    const options = [
      'All',
      '63rd Street Beach',
      'Calumet Beach',
      'Montrose Beach',
      'Ohio Street Beach',
      'Osterman Beach',
      'Rainbow Beach'
  ];
    const columns = [
      { field: 'Beach_Name', headerName: 'Beach Name', width: 350 },
      { field: 'Water_Temperature', headerName: 'Water Temperature', width: 350 },
      { field: 'Measurement_ID', headerName: 'ID', width: 350 },
      { field: 'Measurement_Timestamp_Label', headerName: 'Measurement Timestamp Label', width: 350 },
      
    ]

    const getData = (beach) => {
      if(beach === "All"){
        fetch(API.URL+'Sensor/40')
            .then(response => response.json())
            .then((data)=>{setDataTable(data);})
            .catch((e)=> console.log(e));
      }
      else{
         fetch(API.URL+'Sensor/20,'+beach)
         .then(response => response.json())
         .then((data)=>{setDataTable(data);})
         .catch((e)=> console.log(e));
      }
    }
    useEffect(()=>{
      getData(selectedOption);
    },[selectedOption])

    console.log(dataTable);
    
    const handleGetRowId = (e) => {
      return e.Measurement_ID;
    }

  return (
    <div className='dataTable' >
      <div className="dataTableTitle">
        <img src="https://findicons.com/files/icons/2016/vista_style_objects/256/report_check.png"
         alt="Report Icon" 
         className="titleImg" />
        <span className="dataTableTitleTop">REPORT</span>
      </div>
      <div className="dataTableContain">
        <div className="dataTableContainTop">
          <span className="dataTableLocation">Location</span>
          <ComboBox className='comboboxDatabale'
            options={options}
            placeholder="Choose Beach"
            defaultIndex={4}
            optionsListMaxHeight={300}
            style={{
            width: "350px",
            marginLeft:"0px"
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
        <div className="dataContainBottom">
          <span className="dataContainBottomTitle">Data Report</span>
          <DataGrid className='dataTabletables'  
            style={{ height: '580px', width: '1480px',marginTop:'10px',marginLeft:'20px' }}
            rows={dataTable}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={handleGetRowId}
          />
        </div>
      </div>
    </div>
  )
}
