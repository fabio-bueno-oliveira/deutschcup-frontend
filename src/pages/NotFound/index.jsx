import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NotFoundPage () {

  document.title = 'Ops! Página não encontrada! - Deutsch Cup 2024';

  return (
    <Container fluid="md">
      <Row>
        <Col>404 Not Found</Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;