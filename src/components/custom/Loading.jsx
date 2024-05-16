import { Spinner, Container, Row, Col } from 'react-bootstrap'

const LoadingFallback = () => (
  <Container
    className="d-flex justify-content-center align-items-center"
    style={{ height: '100vh' }}
  >
    <Row>
      <Col className="text-center">
        <Spinner animation="border" variant="primary" />
      </Col>
    </Row>
  </Container>
)
export default LoadingFallback
