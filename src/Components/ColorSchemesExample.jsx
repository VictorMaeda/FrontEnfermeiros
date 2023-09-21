import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.css";
import { Outlet, useNavigate } from 'react-router-dom'; // Importe useNavigate do react-router-dom
import './NavBar.css';

const customNavbarStyle = {
  backgroundColor: '#68FFA6',
};

const customLinkStyle = {
  color: 'black',
  fontSize: '22px',
  marginLeft: '40px'
};

function sair(navigate) {
  sessionStorage.setItem("token", null);
  navigate("/");
}

function ColorSchemesExample() {
  const navigate = useNavigate(); // Obtenha o objeto navigate

  return (
    <>
      <Navbar style={customNavbarStyle} variant="dark">
        <Container>
          <Navbar.Brand>
          <img
              src="\SpringMed.png"
              width="193.2" // Corrija a vírgula para um ponto
              height="54"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link style={customLinkStyle} href="/Plantoes">Plantoes</Nav.Link>
            <Nav.Link style={customLinkStyle} href="/Enfermeiros">Enfermeiros</Nav.Link>
            <Nav.Link style={customLinkStyle} href="/DashBoard">DashBoard</Nav.Link>
          </Nav>
          <button onClick={() => sair(navigate)} className='botaoSair'>
            <img
              src="\Saida.png"
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt="Logo"
            />
            </button>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default ColorSchemesExample;
