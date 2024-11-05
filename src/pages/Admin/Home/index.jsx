import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/actions/authentication';
import { inscricoesInfos } from '../../../store/actions/inscricoes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
// import { CSVLink, CSVDownload } from "react-csv";

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

  // const csvTituloColunas = [
  //   "aceita_receber_comunicacoes", "ano_evento", "apelido", "createdAt", "data_nascimento", "email", "endereco_cidade", "endereco_estado", "endereco_pais", "etapa_evento", "genero", "id", "ja_possuiu_veiculo_porsche", "modifiedAt", "nome", "possui_veiculo_porsche", "sobrenome", "tamanho_camiseta", "whatsapp"
  // ]

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
      <Nav
        activeKey="/admin/home"
        variant="tabs"
        className="mt-3"
      >
        <Nav.Item>
          <Nav.Link active disabled>Inscrições</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/ranking">Ranking</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/configuracoes">Configurações</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container fluid>
        <Row>
          <Col>
            {/* <CSVLink data={csvData}>Download me</CSVLink> */}
            <h4 className="my-4">Inscritos {inscricoes.success && `(${inscricoes?.list.length})`}</h4>
            {inscricoes.requesting ? (
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
                        <th>ID Inscrição</th>
                        <th>Nome</th>
                        <th>Data envio inscrição</th>
                        <th>Etapa</th>
                        <th>Apelido</th>
                        <th>Tamanho camiseta</th>
                        <th>Whatsapp</th>
                        <th>Email</th>
                        <th>Gênero</th>
                        <th>Cidade</th>
                        <th>Data de nascimento</th>
                        <th>Possui veículo Porsche?</th>
                        <th>Já possuiu veículo Porsche?</th>
                        <th>Aceita Comunicação</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {inscricoes?.list.map((inscrito, key) => (
                        <tr key={key}>
                          <td style={{color:'gray', cursor:'default'}}>{key + 1}</td>
                          <td>{inscrito.id}</td>
                          <td><a href={`/admin/inscricao/${inscrito.id}`}>{inscrito.nome} {inscrito.sobrenome}</a></td>
                          <td>{inscrito.createdAt}</td>
                          <td>
                            <Badge bg={inscrito.etapa_evento === "Fevereiro 2025" ? "danger" :  "primary"}>
                              {inscrito.etapa_evento}
                            </Badge>
                          </td>
                          <td>{inscrito.apelido}</td>
                          <td>{inscrito.tamanho_camiseta}</td>
                          <td>{inscrito.whatsapp}</td>
                          <td>{inscrito.email}</td>
                          <td style={{textTransform: 'capitalize'}}>{inscrito.genero}</td>
                          <td>{inscrito.endereco_cidade}/{inscrito.endereco_estado}</td>
                          <td>{inscrito.data_nascimento}</td>
                          <td>{inscrito.possui_veiculo_porsche ? <Badge bg="success">Sim</Badge> : <Badge bg="secondary">Não</Badge>}</td>
                          <td>{inscrito.ja_possuiu_veiculo_porsche ? <Badge bg="success">Sim</Badge> : <Badge bg="secondary">Não</Badge>}</td>
                          <td>{inscrito.aceita_receber_comunicacoes ? <Badge bg="success">Sim</Badge> : <Badge bg="secondary">Não</Badge>}</td>
                          <td><a href={`/admin/inscricao/${inscrito.id}`}>Ver detalhes</a></td>
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