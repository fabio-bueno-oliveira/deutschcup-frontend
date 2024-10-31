import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/actions/authentication';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import logoColor from '../../assets/deutsch-cup-2024-logo-color.png';
import './styles.scss';

function InscricaoPage () {

  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const addBodyClass = (className) => document.body.classList.add(className);
  const dispatch = useDispatch();

  useEffect(
    () => {
      addBodyClass('landingFull')
    }, []
  );

  const logout = () => {
    dispatch(userActions.logout());
  }

  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    aceita_receber_comunicacoes: '',
    ano_evento: '2024',
    data_evento: '2024-11-03',
    nome: '',
    sobrenome: '',
    email: '',
    whatsapp: '',
    endereco_pais: '27',
    endereco_estado: '',
    endereco_cidade: '',
    genero: '',
    data_nascimento: '',
    possui_veiculo_porsche: '',
    ja_possuiu_veiculo_porsche: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  
    if (
      formData.nome && 
      formData.sobrenome && 
      formData.genero && 
      formData.data_nascimento && 
      formData.email
    ) {
      fetch('https://deutschcup-a6b22e51057c.herokuapp.com/inscricao', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          aceita_receber_comunicacoes: formData.aceita_receber_comunicacoes,
          ano_evento: '2024',
          data_evento: '2024-11-03',
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          email: formData.email,
          whatsapp: formData.whatsapp,
          endereco_pais: '27',
          endereco_estado: formData.endereco_estado,
          endereco_cidade: formData.endereco_cidade,
          genero: formData.genero,
          data_nascimento: formData.data_nascimento,
          possui_veiculo_porsche: formData.possui_veiculo_porsche,
          ja_possuiu_veiculo_porsche: formData.ja_possuiu_veiculo_porsche
        })
      })
      .then((response) => {
        console.log(response);
        setSuccess(true);
      }).catch(err => {
        console.error(err);
        setError("Ocorreu um erro. Tente novamente em instantes");
        setSuccess(false);
      })
    }
  }

  return (
    <>
      <Navbar expand="lg" fixed="top" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/" bg="dark" data-bs-theme="dark">
            <Image src={logoColor} alt="Logo da Deutsch Cup 2024 - São Paulo" />
          </Navbar.Brand>
          <Navbar.Toggle bg="dark" data-bs-theme="dark" />
          <Navbar.Collapse id="basic-navbar-nav" bg="dark" data-bs-theme="dark">
            <Nav className="me-auto">
              <Nav.Link href="/sobre">Sobre o evento</Nav.Link>
              <Nav.Link href="/inscricao" active>Inscrição</Nav.Link>
              {!loggedIn && 
                <Nav.Link href="/login">Login</Nav.Link>
              }
              {loggedIn && 
                <NavDropdown title="Minha Conta" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/admin/home">Painel</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => logout()}>Sair</NavDropdown.Item>
                </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container id="formInscricao">
        <Row>
          <Col>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <h3>Inscrição</h3>
                <h6 className='mb-4'>Inscreva-se para a Deutsch Cup</h6>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Select className="mb-2" id="data_evento"
                      onChange={(e) => setFormData({...formData, data_evento: e.target.options[e.target.selectedIndex].value})}
                    >
                      <option value="2024-11-03">Deutsch Cup | Novembro 2024 | São Paulo/SP</option>
                    </Form.Select>
                    <Row className="mb-2">
                      <Form.Group as={Col} controlId="nome">
                        <FloatingLabel
                          label="Nome"
                          className="mb-3"
                        >
                          <Form.Control 
                            type="text" placeholder="Insira seu nome"
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})} 
                            required
                          />
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                          Informe seu nome
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="sobrenome">
                        <FloatingLabel
                          label="Sobrenome"
                          className="mb-3"
                        >
                          <Form.Control 
                            type="text" placeholder="Insira seu sobrenome" 
                            value={formData.sobrenome}
                            onChange={(e) => setFormData({...formData, sobrenome: e.target.value})} 
                            required
                          />
                        </FloatingLabel> 
                        <Form.Control.Feedback type="invalid">
                          Informe seu sobrenome
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group as={Col} controlId="email">
                        <FloatingLabel
                          label="E-mail"
                          className="mb-3"
                        >
                          <Form.Control 
                            type="email" placeholder="Insira seu e-mail"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            required
                          />
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                          Informe seu email
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="whatsapp">
                        <FloatingLabel
                          label="Whatsapp"
                          className="mb-3"
                        >
                          <Form.Control 
                            type="tel" placeholder="Insira seu número de celular" 
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} 
                            maxLength={15} 
                            required
                          />
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                          Informe seu telefone com Whatsapp
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group as={Col} controlId="endereco_estado">
                        <FloatingLabel label="Estado">
                          <Form.Select 
                            onChange={(e) => setFormData({...formData, endereco_estado: e.target.options[e.target.selectedIndex].value})}
                            required
                          >
                            <option value="">Informe o Estado</option>
                            {/* {estados.map((estado, key) => (
                              <option key={key} value={estado.id}>{estado.nome}</option>
                            ))} */}
                            <option value="415">Acre</option><option value="422">Alagoas</option><option value="406">Amapa</option><option value="407">Amazonas</option><option value="402">Bahia</option><option value="409">Ceara</option><option value="424">Distrito Federal</option><option value="401">Espirito Santo</option><option value="411">Goias</option><option value="419">Maranhao</option><option value="418">Mato Grosso</option><option value="399">Mato Grosso do Sul</option><option value="404">Minas Gerais</option><option value="408">Para</option><option value="405">Paraiba</option><option value="413">Parana</option><option value="417">Pernambuco</option><option value="416">Piaui</option><option value="410">Rio de Janeiro</option><option value="414">Rio Grande do Norte</option><option value="400">Rio Grande do Sul</option><option value="403">Rondonia</option><option value="421">Roraima</option><option value="398">Santa Catarina</option><option value="412">Sao Paulo</option><option value="423">Sergipe</option><option value="420">Tocantins</option>
                          </Form.Select>
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                          Informe o seu Estado
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="endereco_cidade">
                        <FloatingLabel
                          label="Cidade"
                          className="mb-3"
                        >
                          <Form.Control 
                            type="text" placeholder="Informe sua Cidade"
                            value={formData.cidade}
                            onChange={(e) => setFormData({...formData, endereco_cidade: e.target.value})} 
                            required
                          />
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                          Informe sua Cidade
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="genero">
                        <FloatingLabel label="Gênero">
                          <Form.Select 
                            onChange={(e) => setFormData({...formData, genero: e.target.options[e.target.selectedIndex].value})}
                            required
                          >
                            <option value="">Informe o seu gênero</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="prefere_nao_informar">Não informar</option>
                          </Form.Select>
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                          Informe seu gênero
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="data_nascimento">
                        <FloatingLabel
                          label="Data de nascimento"
                          className="mb-3"
                        >
                          <Form.Control type="date" maxLength={10} 
                            value={formData.data_nascimento}
                            onChange={(e) => setFormData(
                              {...formData, data_nascimento: e.target.value}
                            )} 
                            required 
                          />
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                          Informe sua data de nascimento
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <Form.Check
                        type='checkbox'
                        id='aceita_receber_comunicacoes'
                        label={`Aceito receber comunicação da DS Cars`}
                        onChange={(e) => setFormData({...formData, aceita_receber_comunicacoes: e.target.checked})}
                      />
                      <Form.Check
                        type='checkbox'
                        id='possui_veiculo_porsche'
                        label={`Possuo veículo da marca Porsche`}
                        onChange={(e) => setFormData({...formData, possui_veiculo_porsche: e.target.checked})}
                      />
                      <Form.Check
                        type='checkbox'
                        id='ja_possuiu_veiculo_porsche'
                        label={`Já possuí um veículo da marca Porsche`}
                        onChange={(e) => setFormData({...formData, ja_possuiu_veiculo_porsche: e.target.checked})}
                      />
                    </Col>
                  </Row>
                  <Button 
                    variant="secondary" 
                    type="submit"
                    disabled={success ? true : false}
                    onClick={(e) => handleSubmit(e)}
                  >
                    {success ? "Enviado com sucesso!" : "Enviar"}
                  </Button>
                </Form>
                {success &&
                  <Alert variant='success' className='mt-3'>
                    Inscrição realizada com sucesso! Em breve você receberá mais informações.
                  </Alert>
                }
                {error &&
                  <Alert variant='danger' className='mt-3'>
                    {error}
                  </Alert>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <footer>
        <p className='footer'>Deutsch Cup ® 2024 | Por Deutsch Sport Cars SP</p>
      </footer>
    </>
  );
};

export default InscricaoPage;