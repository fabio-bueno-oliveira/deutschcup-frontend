import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

function LoginPage () {

  let navigate = useNavigate();
  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const addBodyClass = (className) => document.body.classList.add(className);

  useEffect(
    () => {
      addBodyClass('landingFull')
    }, []
  );

  return (
    <>
      {loggedIn &&  
        navigate('/home')
      }
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
              <NavDropdown title="Minha Conta" id="basic-nav-dropdown">
                {!loggedIn && 
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                }
                {loggedIn && 
                  <>
                    <NavDropdown.Item href="/conta">Meus dados</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/">Sair</NavDropdown.Item>
                  </>
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container id="formLogin">
        <Row>
          <Col>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <h3>Login</h3>
                <h6 className='mb-4'>Acesse sua conta da Deutsch Cup ® 2024</h6>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="Insira seu e-mail" />
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Senha</Form.Label>
                      <Form.Control type="password" placeholder="Senha" />
                    </Form.Group>
                  </Form.Group>
                  <Button variant="secondary" type="submit"
                    onClick={() => alert("O login ainda não está habilitado. Volte em breve!")}
                  >
                    Enviar
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <footer className='onFooter'>
        <p className='footer'>Deutsch Cup ® 2024 | Por Deutsch Sport Cars SP</p>
      </footer>
    </>
  );
};

export default LoginPage;