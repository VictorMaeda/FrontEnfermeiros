import React, { useEffect } from 'react';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import { Chart } from "react-google-charts";
import './DashBoard.css'
import { sessionValidate } from '../services/UserService';


const DashBoard = () => {
  
  const data = [
    ["Element", "Enfermeiros", { role: "style" }],
    ["18/09", 18, "color : #07b164"],
    ["19/09", 9, "red"],
    ["20/09", 11, "orange"],
    ["21/09", 12, "yellow"],
    ["22/09", 15, "color : #1aadf5"],
    ["23/09", 17, "color : #0aefb1"],
    ["24/09", 20, "color : #00ff00"],
  ];

      sessionValidate();

  return (
    <div>
      <ColorSchemesExample />
      <div className='Grafico'>
        <Chart chartType="ColumnChart" width="80%" height="100%" data={data} />
      </div>
    </div>
  );
}

export default DashBoard;
