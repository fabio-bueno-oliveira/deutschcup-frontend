import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home () {

  document.title = 'Home - Deutsch Cup 2024';

  return (
    <Container fluid="md">
      <Row>
        <Col>Home</Col>
      </Row>
    </Container>
  );
};

export default Home;