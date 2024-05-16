import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const CauseDetails = ({
  court,
  address,
  jurisdiction,
  processType,
  proceduralStage,
}) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Row className="justify-content-between align-items-center">
          <Col>
            <h5 className="fs-9 mb-3">Datos de la causa</h5>
            <p>
              <strong>Juzgado:</strong> {court}
            </p>
            <p>
              <strong>Jurisdicción:</strong> {jurisdiction}
            </p>
            <p>
              <strong>Tipo de proceso:</strong> {processType}
            </p>
            <p>
              <strong>Etapa procesal:</strong> {proceduralStage}
            </p>
            <p>
              <strong>Domicilio:</strong> {address}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default CauseDetails
