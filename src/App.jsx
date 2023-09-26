import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Plantoes from './Pages/Plantoes';
import Login from './Pages/Login';
import Enfermeiros from './Pages/Enfermeiros';
import DashBoard from './Pages/DashBoard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/aaa' element={<Login />} />
          <Route path='/' element={<Login />} />
          <Route path='/Plantoes' element={<Plantoes />} />
          <Route path='/Enfermeiros' element={<Enfermeiros />} />
          <Route path='/DashBoard' element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;