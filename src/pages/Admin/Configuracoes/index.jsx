import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { userActions } from '../../../store/actions/authentication';
import { configuracoesInfos } from '../../../store/actions/configuracoes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

function ConfiguracoesPage () {

  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const params = useParams();
  const inscricaoId = params?.inscricaoId;
  const loading = useSelector(state => state.inscricoes.requesting);
  document.title = `Configurações - Deutsch Cup 2024`;

  useEffect(() => { 
    dispatch(configuracoesInfos.getConfiguracoes());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inscricaoId]);

  const configuracoes = useSelector(state => state.configuracoes);
  const ranking = useSelector(state => state.configuracoes?.list?.[0]);
  const inscricao = useSelector(state => state.configuracoes?.list?.[1]);

  const logout = () => {
    dispatch(userActions.logout());
  }

  const [formData, setFormData] = useState({
    apelido: '',
    tamanho_camiseta: '2024'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false)
    setIsLoading(true)
    setTimeout(() => {
      fetch('https://deutschcup-a6b22e51057c.herokuapp.com/configuracoes/atualizar', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + loggedUser.token
        },
        body: JSON.stringify({
          id: inscricaoId, 
          apelido: formData.apelido, 
          tamanho_camiseta: formData.tamanho_camiseta
        })
          }).then((response) => {
            console.log(response)
            // dispatch(inscricoesInfos.getInscricaoDetalhe(inscricaoId));
            setIsLoading(false)
            setSuccess(true)
          }).catch(err => {
            console.error(err)
            alert("Ocorreu um erro ao atualizar a inscrição")
            setIsLoading(false)
            setSuccess(false)
      })
    }, 300);
  ;}

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
        activeKey="/admin/configuracoes"
        variant="tabs"
        className="mt-3"
      >
        <Nav.Item>
          <Nav.Link href="/admin/home">Inscrições</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/ranking">Ranking</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active disabled>Configurações</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container className="pb-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h4 className="my-4">Configurações {configuracoes.requesting && "(Carregando...)" }</h4>
            {success && 
              <Alert variant='success'>
                Informação atualizada com sucesso!
              </Alert>
            }
            <Card>
              <Card.Body>
                <Card.Title>Ranking</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Textos da funcionalidade de Ranking na landing Page
                </Card.Subtitle>
                <Form.Group controlId="titulo">
                  <Form.Label>Título</Form.Label>
                  <Form.Control 
                    type="text"
                    value={ranking?.titulo}
                    disabled
                  />
                </Form.Group>
                <Form.Group controlId="subtitulo">
                  <Form.Label>Subtítulo</Form.Label>
                  <Form.Control 
                    type="text"
                    value={ranking?.subtitulo}
                    disabled
                  />
                </Form.Group>
                {/* <Button 
                  variant="primary" type="submit" 
                  className="mt-3" 
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(e)}
                  size="sm"
                >
                  {isLoading ? 'Enviando...' : 'Atualizar'}
                </Button> */}
              </Card.Body>
            </Card>
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Formulário de Inscrição</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Textos da funcionalidade de Formulário na landing Page
                </Card.Subtitle>
                <Form.Group controlId="titulo">
                  <Form.Label>Título</Form.Label>
                  <Form.Control 
                    type="text"
                    value={inscricao?.titulo}
                    disabled
                  />
                </Form.Group>
                <Form.Group controlId="subtitulo">
                  <Form.Label>Subtítulo</Form.Label>
                  <Form.Control 
                    type="text"
                    value={inscricao?.subtitulo}
                    disabled
                  />
                </Form.Group>
                {/* <Button 
                  variant="primary" type="submit" 
                  className="mt-3" 
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(e)}
                  size="sm"
                >
                  {isLoading ? 'Enviando...' : 'Atualizar'}
                </Button> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ConfiguracoesPage;