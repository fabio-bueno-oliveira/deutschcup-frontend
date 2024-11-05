import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../../store/actions/authentication';
import { inscricoesInfos } from '../../../store/actions/inscricoes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';

function CriarNovoRegistroRanking () {

  document.title = 'Novo registro - Ranking - Deutsch Cup';
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(inscricoesInfos.getInscritos());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    etapa: '',
    id_inscrito: '',
    // posicao: 1,
    numero_carro: '',
    tempo: '00:02:15.398',
    data: '',
    exibir: '1',
    observacoes: ''
  });

  const logout = () => {
    dispatch(userActions.logout());
  }

  let navigate = useNavigate();
  const inscritos = useSelector(state => state.inscricoes.inscritos);
  const carregandoInscritos = useSelector(state => state.inscricoes.requesting);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    if (
      formData.etapa && 
      formData.id_inscrito && 
      // formData.posicao && 
      formData.numero_carro && 
      formData.tempo && 
      formData.data
    ) {
      setIsSubmitting(true);
      fetch('https://deutschcup-a6b22e51057c.herokuapp.com/ranking', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + loggedUser.token
        },
        body: JSON.stringify({
          etapa: formData.etapa,
          id_inscrito: formData.id_inscrito,
          // posicao: formData.posicao,
          numero_carro: formData.numero_carro,
          tempo: formData.tempo,
          data: formData.data,
          exibir: 1,
          observacoes: formData.observacoes
        })
      })
      .then((response) => {
        console.log(response);
        setIsSubmitting(false);
        setError("");
        navigate('/admin/ranking')
      }).catch(err => {
        console.error(err);
        setError("Ocorreu um erro. Tente novamente em instantes");
        setIsSubmitting(false);
      })
    }
  }

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
      <Container className="pb-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h4 className="my-4">
              Criar novo registro para o ranking
            </h4>
            {error &&
              <Alert variant='success' className='mt-3'>
                {error}
              </Alert>
            }
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-2">
                {/* <input type="time" step="0.001"></input>
                <input id="test" type="datetime-local" step="0.001"></input> */}
                <Form.Group controlId="etapa" className="mb-3">
                  <Form.Select  
                    required
                    onChange={(e) => setFormData({
                      ...formData, 
                      etapa: e.target.options[e.target.selectedIndex].value
                    })}
                  >
                    <option value="">Selecione a etapa</option>
                    <option value="Novembro 2024">Novembro 2024</option>
                    <option value="Fevereiro 2025">Fevereiro 2025</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="id_inscrito" className="mb-3">
                  <Form.Select 
                    required
                    onChange={(e) => setFormData({
                      ...formData,
                      id_inscrito: e.target.options[e.target.selectedIndex].value
                    })}
                  >
                    {carregandoInscritos ? (
                      <option value="">Carregando pilotos...</option>
                    ) : (
                      <>
                        <option value="">Selecione o piloto</option>
                        {inscritos.map((inscrito, key) => (
                          <option key={key} value={inscrito.id}>
                            {inscrito.nome} {inscrito.sobrenome} {inscrito.apelido && `'${inscrito.apelido}'`} ({inscrito.email}) | {inscrito.endereco_cidade}/{inscrito.endereco_estado} 
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Select>
                </Form.Group>
                {/* <Form.Group as={Col} controlId="posicao">
                  <Form.Label>Posição</Form.Label>
                  <Form.Control 
                    type="number"
                    value={formData.posicao}
                    onChange={(e) => setFormData({...formData, posicao: e.target.value})}
                    required
                  />
                </Form.Group> */}
                <Form.Group as={Col} controlId="numero_carro">
                  <Form.Label>Número do carro</Form.Label>
                  <Form.Control 
                    type="text"
                    required
                    value={formData.numero_carro}
                    onChange={(e) => setFormData({...formData, numero_carro: e.target.value})}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} controlId="tempo">
                  <Form.Label>Tempo</Form.Label>
                  <Form.Control 
                    type="time" 
                    step="0.001"
                    value={formData.tempo} 
                    onChange={(e) => setFormData({...formData, tempo: e.target.value})}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="data">
                  <Form.Label>Data</Form.Label>
                  <Form.Control 
                    type="date"
                    value={formData.data} 
                    required
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                  />
                </Form.Group>
              </Row>
              <Form.Control
                id="observacoes"
                as="textarea"
                placeholder="Observações (opcional)"
                style={{ height: '60px' }}
                maxLength={125}
                className="mb-3" 
                value={formData.observacoes}
                onChange={(e) => setFormData({
                  ...formData, observacoes: e.target.value
                })}
              />
              <Button 
                variant="primary" type="submit" 
                className="me-2" 
                disabled={isSubmitting}
                onClick={(e) => handleSubmit(e)}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </Button>
              <Button variant="outline-primary" type="submit" href="/admin/ranking">
                Voltar à lista de Rankings
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CriarNovoRegistroRanking;