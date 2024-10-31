import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { userActions } from '../../../store/actions/authentication';
import { inscricoesInfos } from '../../../store/actions/inscricoes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

function MinhaContaPage () {

  document.title = 'Detalhe Inscrição - Deutsch Cup 2024';
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const params = useParams();
  const inscricaoId = params?.inscricaoId;

  useEffect(() => { 
    dispatch(inscricoesInfos.getInscricoes());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
  }

  const inscricao = useSelector(state => state.inscricoes);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/admin/home">DS Cup 2024</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {loggedUser.nome}
              <Button 
                variant="secondary" 
                size="sm" 
                style={{ marginLeft: '10px'}} 
                onClick={() => logout()}
              >
                Sair
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col>
            <h4 className="my-4">Minha Conta</h4>
            {inscricao.requesting ? (
              <p>Carregando...</p>
            ) : (
              <>
                
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MinhaContaPage;