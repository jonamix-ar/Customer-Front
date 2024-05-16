import React from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import logoSrc from '@/assets/images/logos/logo-legalistas-verde.svg'

const NotFound = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <div className="p-4 w-100 text-center">
        <Image src={logoSrc} width="100%" height="50%" className="mb-4" />
        <h1 className="text-xl fw-bold mb-4">404</h1>
        <p className="text-gray-600 mb-4">Oops! Página no encontrada.</p>
        <Button href="/mis-causas" variant="primary" className="rounded-pill">
          Volver a la página de inicio
        </Button>
      </div>
    </Container>
  )
}

export default NotFound
