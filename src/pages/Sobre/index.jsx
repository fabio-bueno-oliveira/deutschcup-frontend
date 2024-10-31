import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/actions/authentication';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import logoColor from '../../assets/deutsch-cup-2024-logo-color.png';
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
            <Col className='pb-3'>
              <h4 className='mb-2'>Dinâmica do Evento - Deutsch Cup 2024</h4>
              <p>Seja bem-vindo à Deutsch Cup 2024! A competição deste ano promete muita emoção, velocidade e adrenalina. Confira a dinâmica completa do evento e prepare-se para acelerar com tudo!</p>
              <h4 className='mb-2'>Inscrições:</h4>
              <ul>
                <li><strong>Abertura:</strong> As inscrições estão abertas para todos os entusiastas do automobilismo e são gratuitas</li>
                <li><strong>Vagas Limitadas:</strong> Garanta sua vaga até o dia 03 de novembro acessando www.deutschcup.com.br</li>
              </ul>
              <h4 className='mb-2'>Treinos:</h4>
              <p>Início dos Treinos: A partir do dia 04 de novembro, cada piloto inscrito terá direito a um treino por semana no simulador. Essa é a oportunidade de conhecer melhor o carro, o Porsche GT3 RS, e o circuito internacional escolhido para a competição foi Interlagos.</p>
              <h4 className='mb-2'>Corrida Final - Fast Lap:</h4>
              <ul>
                <li><strong>Data da Final:</strong> Dia 23 de novembro.</li>
                <li><strong>Formato da Corrida:</strong> Cada piloto terá 5 minutos para mostrar o seu melhor. O desafio é fazer a volta mais rápida possível, que será contabilizada no ranking geral.</li>
                <li><strong>Pódio e Premiação:</strong> Ao final do evento, os pilotos com os melhores tempos subirão ao pódio e serão reconhecidos com prêmios especiais!
                </li>
              </ul>
              <p>Prepare-se para uma experiência imersiva e desafiadora! A Deutsch Cup 2024 é a chance de você viver a emoção das pistas e mostrar suas habilidades. Não perca tempo, inscreva-se e venha competir!</p>
              <p><strong>Equipe Deutsch Cup</strong></p>
              <p className="text-center mt-5">
                <Button variant="dark" size="md" href="/inscricao">
                  Quero me inscrever
                </Button>
              </p>
              <p className='mt-2 text-center'>Faça sua inscrição para que nosso time entre em contato com a confirmação da sua participação no campeonato.</p>
            </Col>
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