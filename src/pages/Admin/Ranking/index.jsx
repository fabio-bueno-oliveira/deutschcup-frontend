import { useEffect, useState } from 'react';
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
import { FaFlagCheckered } from "react-icons/fa";

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

  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (id, option) => {
    setIsLoading(true)
    setTimeout(() => {
      fetch('https://deutschcup-a6b22e51057c.herokuapp.com/ranking/exibir', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + loggedUser.token
        },
        body: JSON.stringify({
          id: id, 
          exibir: option
        })
          }).then((response) => {
            console.log(response)
            dispatch(rankingInfos.getRanking());
            setIsLoading(false)
          }).catch(err => {
            console.error(err)
            alert("Ocorreu um erro ao atualizar a inscrição")
            setIsLoading(false)
      })
    }, 300);
  ;}

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
            <h4 className="mt-4 mb-3">Ranking</h4>
            <Button 
              className="mb-4" 
              variant="primary" 
              size="sm"
              href="/admin/ranking/novo"
            >
              Registrar novo
            </Button>
            {/* <input type="time" step="0.001"></input>
            <input id="test" type="datetime-local" step="0.001"></input> */}
            {rankings.requesting || isLoading ? (
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
                        <th style={{textAlign:'center'}}>Posição no Ranking</th>
                        <th>Nome</th>
                        <th>Etapa</th>
                        <th>Número carro</th>
                        <th>Tempo</th>
                        <th>Data da corrida</th>
                        <th>Exibir no ranking?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankings?.list.map((ranking, key) => (
                        <tr key={key}>
                          <td style={{color:'gray', cursor:'default', textAlign:'center'}}>{key + 1}</td>
                          <td>{(key + 1) === 1 && <FaFlagCheckered />} {ranking.nome} {ranking.sobrenome} {`(Apelido '${ranking.apelido}')`} ({ranking.email})</td>
                          <td>{ranking.etapa}</td>
                          <td>{ranking.numero_carro}</td>
                          <td>{ranking.tempo}</td>
                          <td>{ranking.data_formatada}</td>
                          <td>
                            {ranking.exibir ? 
                              <Button variant="success" size="sm" onClick={() => handleToggle(ranking.id, 0)}>Sim</Button> 
                              : <Button variant="danger" size="sm" onClick={() => handleToggle(ranking.id, 1)}>Não</Button> 
                            } 
                          </td>
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