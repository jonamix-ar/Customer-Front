import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Api from '@/services/Api'
import GoogleIcon from '@/components/icons/Google'

export const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const Register = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const { first_name, last_name, email, password } = e.target.elements
    const body = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    }

    try {
      const resp = await Api.post('/register', body)
      if (resp.status === 201) {
        setIsLoading(false)
        toast.success('Usuario registrado exitosamente')
        navigate('/') // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
      }
    } catch (error) {
      setIsLoading(false)
      if (error.response.status === 422) {
        const errors = error.response.data.errors
        if (errors.first_name) {
          toast.error(errors.first_name[0])
        }
        if (errors.last_name) {
          toast.error(errors.last_name[0])
        }
        if (errors.email) {
          toast.error(errors.email[0])
        }
        if (errors.password) {
          toast.error(errors.password[0])
        }
      } else {
        toast.error(
          'Error al registrar el usuario. Por favor, inténtalo de nuevo.'
        )
      }
    }
  }

  return (
    <>
      <Card className="card p-4 shadow">
        <Card.Header>
          <div className="text-center w-100 m-auto">
            <h1 className="text-muted text-center pb-0 fw-bold fs-7">
              Registrarse
            </h1>

            <p className="welcomeText text-muted">
              ¡Bienvenido, podrás registrarte fácilmente con los detalles que te
              proporcionaremos.!
            </p>
          </div>
        </Card.Header>
        <Card.Body>
          <Form action="#" method="post" onSubmit={handleSubmit}>
            <Row>
              <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3" id="firstName">
                  <Form.Label className="form-label fw-normal fs-9 text-muted">
                    Nombre
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    required
                    autoFocus
                    name="first_name"
                    type="text"
                    placeholder="Ingrese su nombre"
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3" id="lastName">
                  <Form.Label className="form-label fw-normal fs-9 text-muted">
                    Apellido
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    required
                    autoFocus
                    name="last_name"
                    type="text"
                    placeholder="Ingrese su apellido"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={12}>
                <Form.Group className="mb-3" id="email">
                  <Form.Label className="form-label fw-normal fs-9 text-muted">
                    Correo electrónico
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    required
                    autoComplete="email"
                    autoFocus
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3" id="password">
                  <Form.Label className="form-label fw-normal fs-8 text-muted">
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    required
                    autoComplete="password"
                    autoFocus
                    name="password"
                    type="password"
                    placeholder="••••••••"
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3" id="cpassword">
                  <Form.Label className="form-label fw-normal fs-8 text-muted">
                    Confirmar Contraseña
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="••••••••"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              type="submit"
              className="btn-primary btn-lg fw-normal w-100"
            >
              Registrarme
            </Button>

            <p className="text-center fs-9 mt-4 mb-2 text-muted">
              o registrarte con:
            </p>

            <Button
              variant="outline-light"
              className="justify-content-center d-flex align-items-center w-100"
            >
              <GoogleIcon width="16" height="16" />
              <span className="text-dark">Regístrate con Google</span>
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <p className="position-relative text-center fs-8 d-flex align-items-center justify-content-center text-white z-index-1">
        ¿Ya eres cliente?{' '}
        <NavLink to="/" exact="true" className="ms-2 text-white">
          Acceder
        </NavLink>
      </p>
    </>
  )
}

export default Register
