import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Editor from 'react-simple-wysiwyg';

function ConfiguracoesSobrePage () {

  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  document.title = `Configurações - Deutsch Cup 2024`;

  const configuracoes = useSelector(state => state.configuracoes);
  const inscricoes = useSelector(state => state.configuracoes?.list?.[2]);

  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    text: '',
  });

  const [html, setHtml] = useState('Meu texto em <b>HTML</b>');

  useEffect(() => { 
    dispatch(configuracoesInfos.getConfiguracoes());
    setFormData({
      titulo: inscricoes?.titulo,
      subtitulo: "",
      texto: inscricoes?.texto,
    })
    setHtml(inscricoes?.texto)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inscricoes?.id]);

  const logout = () => {
    dispatch(userActions.logout());
  }

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  function onChangeEditor(e) {
    setHtml(e.target.value);
  }

  const handleSubmit = (e, id) => {
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
          id: id, 
          titulo: formData.titulo, 
          subtitulo: "", 
          texto: html.replace(/"/g, '\\"').replace(/'/g, '"')
        })
          }).then((response) => {
              console.log(response)
              dispatch(configuracoesInfos.getConfiguracoes());
              setIsLoading(false)
              setSuccess(true)
              window.scrollTo(0, 0)
          }).catch(err => {
              console.error(err)
              alert("Ocorreu um erro ao atualizar a inscrição")
              setIsLoading(false)
              setSuccess(false)
              window.scrollTo(0, 0)
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
      <Nav style={{fontSize:'14px'}}>
        <Nav.Item>
          <Nav.Link href="/admin/configuracoes/">Ranking</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/configuracoes/inscricoes">Inscrições</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled>Sobre o evento</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container className="pb-5">
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <h4 className="mb-3 mt-3">Textos da página Sobre o Evento {configuracoes.requesting && "(Carregando...)" }</h4>
            {success && 
              <Alert variant='success'>
                Informação atualizada com sucesso!
              </Alert>
            }
            <Card>
              <Card.Body>
                <Form.Group controlId="titulo" className="mb-3">
                  <Form.Label>Título</Form.Label>
                  <Form.Control 
                    type="text"
                    defaultValue={inscricoes?.titulo}
                    disabled={isLoading || configuracoes.requesting}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3 mt-3">
                  <Form.Label>Texto</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={26}
                    defaultValue={inscricoes?.texto} 
                    disabled={isLoading || configuracoes.requesting}
                    onChange={(e) => setFormData({...formData, texto: e.target.value})}
                  />
                </Form.Group> */}
                <Form.Label>Texto</Form.Label>
                <Editor value={html} onChange={onChangeEditor} />
                <Button 
                  variant="primary"
                  className="mt-3" 
                  disabled={isLoading}
                  onClick={(e) => handleSubmit(e, 3)}
                  size="sm"
                >
                  {isLoading ? 'Enviando...' : 'Atualizar'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ConfiguracoesSobrePage;