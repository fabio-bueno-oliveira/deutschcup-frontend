import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/actions/authentication';
import { rankingInfos } from '../../../store/actions/ranking';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';

function Ranking () {

  document.title = 'Ranking - Deutsch Cup';
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(rankingInfos.getRanking());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
  }

  const rankings = useSelector(state => state.rankings);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/admin/home">DS Cup</Navbar.Brand>
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
      <Nav
        activeKey="/admin/ranking"
        variant="tabs"
        className="mt-3"
      >
        <Nav.Item>
          <Nav.Link href="/admin/home">Inscrições</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active disabled>Ranking</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container fluid>
        <Row>
          <Col>
            <h4 className="my-4">Ranking</h4>
            {/* <input type="time" step="0.001"></input>
            <input id="test" type="datetime-local" step="0.001"></input> */}
            <Alert variant='warning'>
              Em desenvolvimento!
            </Alert>
            {rankings.requesting ? (
              <p>Carregando...</p>
            ) : (
              <>
                <div>
                  <Table
                    responsive="sm"
                    bordered
                    hover
                    striped
                    variant="light"
                    size="sm"
                    style={{ fontSize: "14px", overflow: "scroll", marginBottom: "50px" }}
                  >
                    <thead>
                      <tr>
                        <th></th>
                        <th>ID Inscrito</th>
                        <th>Posição</th>
                        <th>Número carro</th>
                        <th>Tempo</th>
                        <th>Data</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Apelido</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankings?.list.map((ranking, key) => (
                        <tr key={key}>
                          <td style={{color:'gray', cursor:'default'}}>{key + 1}</td>
                          <td>{ranking.id_inscrito}</td>
                          <td>{ranking.posicao}</td>
                          <td>{ranking.numero_carro}</td>
                          <td>{ranking.tempo}</td>
                          <td>{ranking.data}</td>
                          <td>{ranking.nome}</td>
                          <td>{ranking.sobrenome}</td>
                          <td>{ranking.apelido}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Ranking;