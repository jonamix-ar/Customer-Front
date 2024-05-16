import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const CauseTitle = ({
  fullName,
  defendantInterveners,
  processTypeName,
  startDate,
}) => {
  return (
    <>
      <Row className="justify-content-between align-items-center mb-2">
        <Col>
          <div className="d-flex">
            <div className="flex-1 fs-10">
              <h1 className="text-left text-uppercase h3">
                {fullName} C/{' '}
                {defendantInterveners ? defendantInterveners : 'No disponible'}{' '}
                S/ {processTypeName ? processTypeName : 'No disponible'}
              </h1>
              <span className="fs-8 fw-semi-bold">
                Fecha de inicio demanda:{' '}
                {startDate ? startDate : 'No disponible'}
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <hr />
    </>
  )
}

export default CauseTitle
