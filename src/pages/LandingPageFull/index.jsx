import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import logoColor from '../../assets/deutsch-cup-2024-logo-color.png';
import './styles.scss';

function LandingPage () {

  const loggedIn = useSelector(state => state.authentication.loggedIn);
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" bg="dark" data-bs-theme="dark" />
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
      <Container fluid id='hero-1'>
        <Container>
          <Row>
            <Col xs={8} lg={6} className='mt-sm-4'>
              <h5>Uma oportunidade única!</h5>
              <p>O maior evento de corrida virtual de <nobr>Porsche GT3</nobr> em um simulador profissional</p>
              <Button variant="secondary" size="sm" href="/sobre">
                Saber mais
              </Button>
            </Col>
            <Col xs={4} lg={6}></Col>
          </Row>
        </Container>
      </Container>
      <Container fluid id='hero-2'>
        <Container>
          <Row>
            <Col className='mt-sm-3'>
              <h3 className='mt-4 mt-sm-2'>Ranking Deutsch Cup 2024</h3>
              <p>O próximo evento ocorrerá em 03/11/2024 e o ranking será divulgado abaixo</p>
              <Table responsive borderless bg="dark" data-bs-theme="dark" size="sm">
                <thead>
                  <tr>
                    <th>Posição</th>
                    <th>#</th>  
                    <th>Nome</th>
                    <th>Nº Voltas</th>
                    <th>Dif. P/ Ant.</th>
                    <th>2º M Volta</th>
                    <th>3º M Volta</th>
                    <th>Tl Voltas</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>3</td>
                    <td>Piloto 1</td>
                    <td>31</td>
                    <td>1:29.598</td>
                    <td>1:29.598</td>
                    <td>2:14.636</td>
                    <td>2:15.379</td>
                    <td>Porsche</td>
                    <td>GT3</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>44</td>
                    <td>Piloto 2</td>
                    <td>31</td>
                    <td>1:32.598</td>
                    <td>1:44.598</td>
                    <td>2:24.636</td>
                    <td>2:18.379</td>
                    <td>Porsche</td>
                    <td>GT3</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container id='hero-3'>
        <h5>Evento promovido pela Deutsch Sport Cars</h5>
        <p>Especialistas em Veículos Porsche Seminovos, a Deutsch Sport Cars está localizada em um tradicional endereço de comércio de veículos importados premium da capital paulista. Venha conhecer o nosso showroom de mais de 300m² com automóveis Porsche e multimarcas selecionados.</p>
      </Container>
      {/* <Container fluid id='hero-cards'>
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Img variant="top" src="https://placehold.co/600x400?text=Imagem+DS+Cup+2024" />
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img variant="top" src="https://placehold.co/600x400?text=Imagem+DS+Cup+2024" />
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img variant="top" src="https://placehold.co/600x400?text=Imagem+DS+Cup+2024" />
              </Card>
            </Col>
          </Row>
        </Container>
      </Container> */}
      <footer>
        <p className='footer'>Deutsch Cup ® 2024 | Por Deutsch Sport Cars SP</p>
      </footer>
    </>
  );
};

export default LandingPage;