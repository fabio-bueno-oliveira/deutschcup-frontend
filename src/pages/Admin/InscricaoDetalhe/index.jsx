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
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function InscricaoDetalhePage () {

  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const params = useParams();
  const inscricaoId = params?.inscricaoId;
  const loading = useSelector(state => state.inscricoes.requesting);
  const inscricao = useSelector(state => state.inscricoes.inscricao);
  document.title = `Inscrição #${inscricaoId} - ${inscricao.nome} ${inscricao.sobrenome} - Deutsch Cup 2024`;

  useEffect(() => { 
    dispatch(inscricoesInfos.getInscricaoDetalhe(inscricaoId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inscricaoId]);

  const logout = () => {
    dispatch(userActions.logout());
  }

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
      <Container className="pb-5">
        <Row>
          <Col>
            <h4 className="my-4">Inscrição ID #{inscricaoId} - {loading ? "Carregando dados..." : `${inscricao.nome} ${inscricao.sobrenome}`}</h4>
            <Alert variant='warning'>
              Edição não disponível no momento
            </Alert>
            <Form>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="id">
                  <Form.Label>ID Inscrição</Form.Label>
                  <Form.Control 
                    type="text"
                    value={inscricao.id} 
                    readOnly
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="createdAt">
                  <Form.Label>Inscrição enviada em</Form.Label>
                  <Form.Control 
                    type="text"
                    value={inscricao.createdAt}
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control 
                    type="text"
                    value={inscricao.nome} 
                    readOnly
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="sobrenome">
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control 
                    type="text"
                    value={inscricao.sobrenome} 
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="apelido">
                  <Form.Label>Apelido</Form.Label>
                  <Form.Control 
                    type="text"
                    value={inscricao.apelido} 
                    readOnly
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="tamanho_camiseta">
                  <Form.Label>Tamanho camiseta</Form.Label>
                  <Form.Control 
                    type="text"
                    value={inscricao.tamanho_camiseta} 
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control 
                    type="email"
                    value={inscricao.email} 
                    readOnly
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="whatsapp">
                  <Form.Label>Whatsapp</Form.Label>
                  <Form.Control 
                    type="tel"
                    value={inscricao.whatsapp} 
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="genero">
                  <Form.Label>Gênero</Form.Label>
                  <Form.Control 
                    type="text"
                    value={inscricao.genero} 
                    readOnly
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="data_nascimento">
                  <Form.Label>Data de nascimento</Form.Label>
                  <Form.Control 
                    type="date"
                    value={inscricao.data_nascimento} 
                    disabled
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-1" controlId="aceita_receber_comunicacoes">
                <Form.Check
                  type="checkbox" 
                  label="Aceita receber comunicaçõeses" 
                  checked={inscricao.whatsapp ? true : false} 
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="possui_veiculo_porsche">
                <Form.Check
                  type="checkbox" 
                  label="Possui veículo da marca Porsche" 
                  checked={inscricao.possui_veiculo_porsche ? true : false} 
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="ja_possuiu_veiculo_porsche">
                <Form.Check
                  type="checkbox" 
                  label="Já possuiu veículo da marca Porsche" 
                  checked={inscricao.ja_possuiu_veiculo_porsche ? true : false} 
                  disabled
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="me-2" disabled>
                Atualizar
              </Button>
              <Button variant="primary" type="submit" href="/admin/home">
                Voltar à lista de Inscrições
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InscricaoDetalhePage;