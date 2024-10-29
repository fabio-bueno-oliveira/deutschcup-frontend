import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import logo from '../../assets/deutsch-cup-2024-logo-color.png';
import './styles.scss'; 

function LandingPage () {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault();

    if (nome, email, telefone) {
      fetch('https://deutschcup-a6b22e51057c.herokuapp.com/preinscricoes/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome: nome, email: email, telefone: telefone})
      })
        .then((response) => response.json())
        .then((response) => {
          setResponse(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }
  
  const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }

  const addBodyClass = (className) => document.body.classList.add(className);

  useEffect(
    () => {
      addBodyClass('landingPre')
    }, []
  );

  return (
    <Container fluid="md" className='landingWrapper'>
      <div className='landingBox'>
        <Row>
          <Col>
            <h2>Em breve uma oportunidade única e exclusiva:</h2>
            <section className="mt-4">
              <Image src={logo} alt="Logo da Deutsch Cup 2024 - São Paulo" width={250} />
            </section>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="mt-4 mb-4">Em Outubro de 2024 em São Paulo, o maior evento de corrida virtual de <strong>Porsche GT3</strong> em um simulador profissional!</h4>
            <h3 className="mt-3">RSVP: Confirme sua participação até sexta 18/10 respondendo a mensagem que recebeu via <span className='whatsapp'>Whatsapp</span></h3>
            <h5 className="mb-3">Ou envie seus dados através do formulário abaixo para participar da pré-inscrição</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" id="nome" name="nome" placeholder="Seu nome" value={nome}
                required 
                onChange={(e) => setNome(e.target.value)}
              />
              <input 
                type="email" id="email" name="email" placeholder="Seu email" value={email}
                required 
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                required
                type="tel" id="telefone" name="telefone"
                placeholder="Telefone (whatsapp)" 
                value={telefone}
                maxLength="15"
                onKeyUp={event => handlePhone(event)}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <input type="submit" value="Enviar" />
            </form>
            {response?.success && 
              <div id="result">
                <Badge bg="success">Pré inscrição realizada com sucesso!</Badge>
              </div>
            }
            {response?.code === "ER_DUP_ENTRY" && 
              <div id="result">
                <Badge bg="danger">Ops! Este email já foi cadastrado na pré inscrição!</Badge>
              </div>}
          </Col>
        </Row>
        <Row>
          <Col>
            <p className='footer'>deutschcup ® 2024</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default LandingPage;