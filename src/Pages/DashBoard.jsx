import React, { useEffect } from 'react';
import ColorSchemesExample from '../Components/ColorSchemesExample';
import './DashBoard.css'
import { sessionValidate } from '../services/UserService';
import Grafico from '../DashBoardComponents/Grafico';
import { Pizza } from '@phosphor-icons/react/dist/ssr';
import GraficoPizza from '../DashBoardComponents/GraficoPizza';


const DashBoard = () => {
  //sessionValidate();
  


  return (
    <>
      <ColorSchemesExample />
      <Grafico />
      <GraficoPizza />
    </>
  );
}

export default DashBoard;
