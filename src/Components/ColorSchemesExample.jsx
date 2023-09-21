import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.css";

const customNavbarStyle = {
  backgroundColor: '#68FFA6',
};

const customLinkStyle = {
  color: 'black',
  fontSize: '22px', // Adicione o espaçamento desejado à direita dos links
  marginLeft: '40px'
};

function ColorSchemesExample() {
  return (
    <>
      <Navbar style={customNavbarStyle} variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              src="\SpringMed.png"
              width="193,2"
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
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default ColorSchemesExample;
