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
          <Col md={{ span: 6, offset: 3 }}>
            <h4 className="my-4">Inscrição ID #{inscricaoId} - {loading ? "Carregando dados..." : `${inscricao.nome} ${inscricao.sobrenome}`}</h4>
            <Alert variant='warning'>
              Edição não disponível no momento
            </Alert>
            <Form>
              <Form.Group className="mb-3" controlId="id">
                <FloatingLabel
                  controlId="floatingInput"
                  label="ID Inscrição"
                  className="mb-3"
                >
                  <Form.Control 
                    type="text" placeholder="ID da Inscrição"
                    disabled 
                    value={inscricao.id} 
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="nome">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Nome"
                  className="mb-3"
                >
                  <Form.Control 
                    type="text" placeholder="Nome do Inscrito"
                    disabled 
                    value={inscricao.nome} 
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="sobrenome">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Sobrenome"
                  className="mb-3"
                >
                  <Form.Control 
                    type="text" placeholder="Nome do Inscrito"
                    disabled 
                    value={inscricao.sobrenome} 
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <FloatingLabel
                  controlId="floatingInput"
                  label="E-mail"
                  className="mb-3"
                >
                  <Form.Control 
                    type="text" placeholder="E-mail"
                    disabled 
                    value={inscricao.email} 
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Whatsapp"
                  className="mb-3"
                >
                  <Form.Control 
                    type="text" placeholder="Whatsapp"
                    disabled 
                    value={inscricao.whatsapp} 
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="genero">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Gênero"
                  className="mb-3"
                >
                  <Form.Control 
                    type="text" placeholder="Gênero"
                    disabled 
                    value={inscricao.genero} 
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="data_nascimento">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Data de Nascimento"
                  className="mb-3"
                >
                  <Form.Control 
                    type="date" placeholder="Data de Nascimento"
                    disabled 
                    value={inscricao.data_nascimento} 
                  />
                </FloatingLabel>
              </Form.Group>
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