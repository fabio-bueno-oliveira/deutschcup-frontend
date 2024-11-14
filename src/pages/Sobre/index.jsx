import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/actions/authentication';
import { configuracoesInfos } from '../../store/actions/configuracoes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import logoColor from '../../assets/deutsch-cup-2024-logo-color.png';
import { Parser } from "html-to-react";
import './styles.scss';

function LandingPage () {

  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const addBodyClass = (className) => document.body.classList.add(className);
  const dispatch = useDispatch();

  useEffect(
    () => {
      addBodyClass('landingFull')
    }, []
  );

  useEffect(() => { 
    dispatch(configuracoesInfos.getConfiguracoes());
  }, [dispatch]);

  const textos = useSelector(state => state.configuracoes?.list?.[2]);
  const loading = useSelector(state => state.configuracoes?.requesting);

  const logout = () => {
    dispatch(userActions.logout());
  }

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
              <Nav.Link href="/sobre" active>Sobre o evento</Nav.Link>
              <Nav.Link href="/inscricao">Inscrição</Nav.Link>
              {!loggedIn && 
                <Nav.Link href="/login">Login</Nav.Link>
              }
              {loggedIn && 
                <NavDropdown title="Minha Conta" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/admin/home">Painel</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logout()}>Sair</NavDropdown.Item>
                </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid id='hero-sobre'>
        <Container>
          <Row>
            {loading ? (
              <Col className='pb-3'>
                <h4 className='mb-2'>Carregando...</h4>
              </Col>
            ) : (
              <Col className='pb-3'>
                <h4 className='mb-2'>{textos?.titulo}</h4>
                {Parser().parse(textos?.texto)}
                <p className="text-center mt-5">
                  <Button variant="dark" size="md" href="/inscricao">
                    Quero me inscrever
                  </Button>
                </p>
                <p className='mt-2 text-center'>
                  Faça sua inscrição para que nosso time entre em contato com a confirmação da sua participação no campeonato.
                </p>
              </Col>
            )}
          </Row>
        </Container>
      </Container>
      <footer>
        <p className='footer'>Deutsch Cup ® 2024 | Por Deutsch Sport Cars SP</p>
      </footer>
    </>
  );
};

export default LandingPage;