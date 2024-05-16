import React, { useEffect, useState } from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { redirectTo } from '@/utils/helpers/url'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSpinner,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import logoSrc from '@/assets/images/components/lawyer-accident.svg'

export default function Intro() {
  const [isLoading, setLoading] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 3000))
    }

    if (isLoading) {
      setLoadingButton(true) // Inicia la carga en el botón
      simulateNetworkRequest().then(() => {
        setLoading(false)
        setLoadingButton(false) // Finaliza la carga en el botón cuando la carga se completa
      })
    }
  }, [isLoading])

  const handleClick = (url) => {
    setLoading(true) // Inicia la carga
    // Redirige a la URL especificada
    redirectTo(url)
  }
  return (
    <Row className="justify-content-center">
      <Col md={12}>
        <Image src={logoSrc} width="100%" height="75%" />
        <p className="fs-8 fw-normal text-center">
          Actualmente no tiene causas abiertas.
        </p>
        <div className="d-grid gap-2">
          {/* Botón "Cargar página" */}
          <Button
            variant="primary"
            onClick={() => handleClick('/consultas/accidentes-de-trabajo')}
            disabled={isLoading}
          >
            {loadingButton ? (
              <FontAwesomeIcon icon={faSpinner} spinPulse />
            ) : (
              <span>
                Accidente de Trabajo
                <FontAwesomeIcon icon={faCircleArrowRight} className="ms-2" />
              </span>
            )}
          </Button>
          {/* Botón "Redirigir a otra URL" */}
          <Button
            variant="primary"
            onClick={() => handleClick('/consultas/accidentes-de-transito')}
            disabled={isLoading}
          >
            {loadingButton ? (
              <FontAwesomeIcon icon={faSpinner} spinPulse />
            ) : (
              <span>
                Accidente de Tránsito
                <FontAwesomeIcon icon={faCircleArrowRight} className="ms-2" />
              </span>
            )}
          </Button>
          <Button
            variant="primary"
            onClick={() => handleClick('/consultas/calcular-indemnizacion')}
            disabled={isLoading}
          >
            {loadingButton ? (
              <FontAwesomeIcon icon={faSpinner} spinPulse />
            ) : (
              <span>
                Calcula tu Indemnización
                <FontAwesomeIcon icon={faCircleArrowRight} className="ms-2" />
              </span>
            )}
          </Button>
        </div>
      </Col>
    </Row>
  )
}
