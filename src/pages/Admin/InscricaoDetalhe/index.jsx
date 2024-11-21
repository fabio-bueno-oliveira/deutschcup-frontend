import { useEffect, useState } from 'react';
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
import Nav from 'react-bootstrap/Nav';

function InscricaoDetalhePage () {

  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const params = useParams();
  const inscricaoId = params?.inscricaoId;
  const loading = useSelector(state => state.inscricoes.requesting);
  const inscricao = useSelector(state => state.inscricoes.inscricao);
  document.title = `Inscrição #${inscricaoId} - ${inscricao.nome} ${inscricao.sobrenome} - Deutsch Cup 2024`;

  const [formData, setFormData] = useState({
    nome: inscricao.nome,
    sobrenome: inscricao.sobrenome,
    apelido: inscricao.apelido,
    tamanho_camiseta: inscricao.tamanho_camiseta
  });

  useEffect(() => {
    dispatch(inscricoesInfos.getInscricaoDetalhe(inscricaoId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inscricaoId]);

  useEffect(() => {
    setFormData({
      nome: inscricao.nome,
      sobrenome: inscricao.sobrenome,
      apelido: inscricao.apelido,
      tamanho_camiseta: inscricao.tamanho_camiseta
    });
  }, [inscricao.id]);

  const logout = () => {
    dispatch(userActions.logout());
  }

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    setIsLoading(true);
    setTimeout(() => {
      fetch('https://deutschcup-a6b22e51057c.herokuapp.com/inscricao/atualizar', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + loggedUser.token
        },
        body: JSON.stringify({
          id: inscricaoId,
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          apelido: formData.apelido,
          tamanho_camiseta: formData.tamanho_camiseta
        })
          }).then((response) => {
            console.log(response);
            dispatch(inscricoesInfos.getInscricaoDetalhe(inscricaoId));
            setIsLoading(false);
            setSuccess(true);
          }).catch(err => {
            console.error(err)
            alert("Ocorreu um erro ao atualizar a inscrição");
            setIsLoading(false);
            setSuccess(false);
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
      <Container className="pb-5">
        <Row>
          <Col>
            <h4 className="my-4">
              Inscrição ID #{inscricaoId} - {loading ? "Carregando dados..." : `${inscricao.nome} ${inscricao.sobrenome}`}
            </h4>
            {success && 
              <Alert variant='success'>
                Inscrição atualizada com sucesso!
              </Alert>
            }
            <Form>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="createdAt">
                  <Form.Label>Inscrição enviada em</Form.Label>
                  <Form.Control 
                    type="text"
                    value={inscricao.createdAt}
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="modifiedAt">
                  <Form.Label>Última atualização em</Form.Label>
                  <Form.Control 
                    type="text"
                    value={inscricao.modifiedAt}
                    disabled
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control 
                    type="text"
                    defaultValue={inscricao.nome} 
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    disabled={loading}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="sobrenome">
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control 
                    type="text"
                    defaultValue={inscricao.sobrenome} 
                    onChange={(e) => setFormData({...formData, sobrenome: e.target.value})}
                    disabled={loading}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Col>
                  <Form.Label>Apelido</Form.Label>
                  <Form.Control 
                    id="apelido"
                    type="text"
                    defaultValue={inscricao.apelido} 
                    onChange={(e) => setFormData({...formData, apelido: e.target.value})}
                  />
                </Col>
                <Col>
                  <Form.Label>Tamanho camiseta</Form.Label>
                  <Form.Select 
                    id="tamanho_camiseta"
                    defaultValue={inscricao.tamanho_camiseta} 
                    onChange={(e) => setFormData({
                      ...formData, 
                      tamanho_camiseta: e.target.options[e.target.selectedIndex].value
                    })}
                  >
                    <option value="">Escolha</option>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                    <option value="XG">XG</option>
                  </Form.Select>
                </Col>
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
              <Form.Group className="mb-4" controlId="ja_possuiu_veiculo_porsche">
                <Form.Check
                  type="checkbox" 
                  label="Já possuiu veículo da marca Porsche" 
                  checked={inscricao.ja_possuiu_veiculo_porsche ? true : false} 
                  disabled
                />
              </Form.Group>
              <Button 
                variant="primary" type="submit" 
                className="me-2" 
                disabled={isLoading}
                onClick={(e) => handleSubmit(e)}
              >
                {isLoading ? 'Enviando...' : 'Atualizar'}
              </Button>
              <Button variant="outline-primary" type="submit" href="/admin/home">
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