import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logoColor from '../../assets/deutsch-cup-2024-logo-color.png';
import './styles.scss';

function MinhaContaPage () {

  const addBodyClass = (className) => document.body.classList.add(className);

  useEffect(
    () => {
      addBodyClass('landingFull')
    }, []
  );

  return (
    <>
      <Navbar expand="lg" fixed="top" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/" bg="dark" data-bs-theme="dark">
            <Image src={logoColor} alt="Logo da Deutsch Cup 2024 - São Paulo" />
          </Navbar.Brand>
          <Navbar.Toggle bg="dark" data-bs-theme="dark" />
          <Navbar.Collapse id="basic-navbar-nav" bg="dark" data-bs-theme="dark">
            <Nav className="me-auto">
              <Nav.Link href="/sobre">Sobre o evento</Nav.Link>
              <Nav.Link href="/inscricao">Inscrição</Nav.Link>
              <NavDropdown title="Minha Inscrição" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item active href="/conta">Meus dados</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Sair</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container id="formLogin">
        <h3>Meus dados</h3>
        <h6 className='mb-4'></h6>
      </Container>
      <footer className='onFooter'>
        <p className='footer'>Deutsch Cup ® 2024 | Por Deutsch Sport Cars SP</p>
      </footer>
    </>
  );
};

export default MinhaContaPage;