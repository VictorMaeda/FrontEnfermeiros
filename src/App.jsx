import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Plantoes from './Pages/Plantoes';
import Login from './Pages/Login';
import Enfermeiros from './Pages/Enfermeiros';
import DashBoard from './Pages/DashBoard';

function App() {

const [token, setToken] = useState(sessionStorage.getItem("token"))


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Plantoes' element={token ? <Plantoes /> : <Navigate to={'/'} />} />
          <Route path='/Enfermeiros' element={<Enfermeiros />} />
          <Route path='/DashBoard' element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;