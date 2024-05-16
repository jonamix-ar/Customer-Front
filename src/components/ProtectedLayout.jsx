import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from '@/layout/Header'
import { useAuth } from '@/contexts/AuthContext'

const ProtectedLayout = () => {
  const { user } = useAuth()

  // Si el usuario no está autenticado, redirigirlo al inicio de sesión
  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Header />
      <Container className="d-flex justify-content-center align-items-center mt-4">
        <Outlet />
      </Container>
    </>
  )
}

export default ProtectedLayout
