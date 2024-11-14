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
import Form from 'react-bootstrap/Form';
import { FaHourglassHalf } from "react-icons/fa";


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

  const handleAtualizaSemana = (id, semana, option) => {
    // setIsLoading(true)
    setTimeout(() => {
      fetch('https://deutschcup-a6b22e51057c.herokuapp.com/ranking/atualizaSemana', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + loggedUser.token
        },
        body: JSON.stringify({
          id: id, 
          semana: semana,
          valor: option
        })
          }).then((response) => {
            dispatch(rankingInfos.getRanking());
            // setIsLoading(false)
          }).catch(err => {
            console.error(err)
            alert("Ocorreu um erro ao atualizar a inscrição")
            // setIsLoading(false)
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
        <Nav.Item>
          <Nav.Link href="/admin/configuracoes">Configurações</Nav.Link>
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
                        <th style={{textAlign:'center'}}>Data da corrida</th>
                        <th style={{textAlign:'center'}}>Exibir na landing</th>
                        <th style={{textWrap:'nowrap',textAlign:'center'}}>Semana 1</th>
                        <th style={{textWrap:'nowrap',textAlign:'center'}}>Semana 2</th>
                        <th style={{textWrap:'nowrap',textAlign:'center'}}>Semana 3</th>
                        <th>Observações</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankings?.list.map((ranking, key) => (
                        <tr key={key}>
                          <td style={{color:'gray', cursor:'default', textAlign:'center'}}>{key + 1}</td>
                          <td><a href={`/admin/ranking/${ranking.id}`}>{ranking.nome} {ranking.sobrenome} {ranking.apelido && `'${ranking.apelido}'`}</a></td>
                          <td>{ranking.etapa}</td>
                          <td>{ranking.numero_carro}</td>
                          <td>{ranking.tempo}</td>
                          <td style={{textAlign:'center'}}>{ranking.data_formatada}</td>
                          <td style={{textAlign:'center'}}>
                            <Form.Check
                              checked={ranking.exibir}
                              type="switch"
                              id="exibir"
                              onChange={() => handleToggle(ranking.id, ranking.exibir ? 0 : 1)}
                            />
                          </td>
                          <td style={{textAlign:'center'}}>
                            <Form.Check
                              checked={ranking.semana1}
                              type="checkbox"
                              id="semana1"
                              onChange={() => handleAtualizaSemana(ranking.id, 1, ranking.semana1 ? 0 : 1)}
                            />
                          </td>
                          <td style={{textAlign:'center'}}>
                            <Form.Check
                              checked={ranking.semana2}
                              type="checkbox"
                              id="semana2"
                              onChange={() => handleAtualizaSemana(ranking.id, 2, ranking.semana2 ? 0 : 1)}
                            />
                          </td>
                          <td style={{textAlign:'center'}}>
                            <Form.Check
                              checked={ranking.semana3}
                              type="checkbox"
                              id="semana3"
                              onChange={() => handleAtualizaSemana(ranking.id, 3, ranking.semana3 ? 0 : 1)}
                            />
                          </td>
                          <td>
                            {ranking.observacoes}
                          </td>
                          <td><a href={`/admin/ranking/${ranking.id}`}>Editar</a></td>
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