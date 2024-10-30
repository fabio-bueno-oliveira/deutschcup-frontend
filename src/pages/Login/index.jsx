import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/actions/authentication';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import logoColor from '../../assets/deutsch-cup-2024-logo-color.png';
import './styles.scss';

function LoginPage () {

  let navigate = useNavigate();
  let dispatch = useDispatch();
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const error = useSelector(state => state.authentication.error);

  const addBodyClass = (className) => document.body.classList.add(className);

  useEffect(
    () => {
      addBodyClass('landingFull')
    }, []
  );

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    if (email && senha) {
      dispatch(userActions.login(email, senha));
    }
  }

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
                {error && 
                  <Alert variant='danger'>
                    {error}
                  </Alert>
                }
                <h3>Login</h3>
                <h6 className='mb-4'>Acesse sua conta da Deutsch Cup ® 2024</h6>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control 
                      type="email" placeholder="Insira seu e-mail" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Informa o email
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="senha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)} 
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Informa sua senha
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button 
                    type="submit"
                    variant="secondary"
                    onClick={(e) => handleSubmit(e)}
                    disabled={
                      loggingIn || !email || !senha
                    }
                  >
                    {loggingIn ? 'Enviando...' : 'Enviar'}
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