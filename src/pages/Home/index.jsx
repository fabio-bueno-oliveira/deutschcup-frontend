import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/actions/authentication';
import { inscricoesInfos } from '../../store/actions/inscricoes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

function Home () {

  document.title = 'Home - Deutsch Cup 2024';
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(inscricoesInfos.getInscricoes());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
  }

  const inscricoes = useSelector(state => state.inscricoes);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/home">DS Cup 2024</Navbar.Brand>
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
            <h4 className="my-4">Inscritos {inscricoes.success && `(${inscricoes?.list.length})`}</h4>
            {inscricoes.requesting ? (
              <p>Carregando...</p>
            ) : (
              <>
                <div>
                  <Table
                    bordered
                    hover
                    variant="light"
                    // style={{ maxHeight: "70vh", overflow: "scroll" }}
                    style={{ fontSize: "14px", overflow: "scroll", marginBottom: "50px" }}
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>ID Inscrição</th>
                        <th>Data Inscrição</th>
                        <th>Nome</th>
                        <th>Whatsapp</th>
                        <th>Email</th>
                        <th>Gênero</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Data de nascimento</th>
                        <th>Possui veículo Porsche?</th>
                        <th>Já possuiu veículo Porsche?</th>
                        <th>Aceita Comunicação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inscricoes?.list.map((inscrito, key) => (
                        <tr key={key}>
                          <td style={{color: 'gray'}}>{key + 1}</td>
                          <td>{inscrito.id}</td>
                          <td>{inscrito.createdAt}</td>
                          <td>{inscrito.nome} {inscrito.sobrenome}</td>
                          <td>{inscrito.whatsapp}</td>
                          <td>{inscrito.email}</td>
                          <td style={{textTransform: 'capitalize'}}>{inscrito.genero}</td>
                          <td>{inscrito.endereco_cidade}</td>
                          <td>{inscrito.endereco_estado}</td>
                          <td>{inscrito.data_nascimento}</td>
                          <td>{inscrito.possui_veiculo_porsche ? <Badge bg="success">Sim</Badge> : <Badge bg="secondary">Não</Badge>}</td>
                          <td>{inscrito.ja_possuiu_veiculo_porsche ? <Badge bg="success">Sim</Badge> : <Badge bg="secondary">Não</Badge>}</td>
                          <td>{inscrito.aceita_receber_comunicacoes ? <Badge bg="success">Sim</Badge> : <Badge bg="secondary">Não</Badge>}</td>
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

export default Home;