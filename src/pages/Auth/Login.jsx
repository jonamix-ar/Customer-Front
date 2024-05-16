import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'
import Api from '@/services/Api'
import { useAuth } from '@/contexts/AuthContext'
import GoogleIcon from '@/components/icons/Google'
import { toast } from 'react-toastify'
// import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAuth()
  const navigate = useNavigate() // Inicializar useHistory

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const resp = await Api.post('/login', { email, password }) // Enviar datos de inicio de sesión al backend
      if (resp.status === 200) {
        const { user, token } = resp.data
        localStorage.setItem('token', token) // Guardar el token en localStorage
        setUser(user) // Establecer el usuario en el contexto de autenticación
        navigate('/mis-causas') // Redirigir al usuario a la página de perfil
      }
    } catch (error) {
      // Manejar errores de inicio de sesión
      toast.error(error.response.data.message, {
        icon: true,
        position: 'top-right',
      })
    }
  }

  return (
    <>
      <Card className="card p-4 shadow">
        <Card.Header>
          <div className="text-center w-100 m-auto">
            <h1 className="text-muted text-center pb-0 fw-bold fs-7">
              Inicia sesión
            </h1>

            <p className="welcomeText text-muted">
              ¡Bienvenido, podrás iniciar sesión fácilmente con los detalles que
              te proporcionaremos.!
            </p>
          </div>
        </Card.Header>
        <Card.Body>
          <Form action="#" method="post" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="form-label fw-normal fs-8 text-muted">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
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
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <p className="text-center fs-9 d-flex align-items-center justify-content-center text-muted">
              ¿Olvidaste tu contraseña?
              <NavLink
                to="/forgot-password"
                exact="true"
                className="ms-2 text-muted"
              >
                Recuperar contraseña
              </NavLink>
            </p>

            <Button
              type="submit"
              className="btn-primary btn-lg fw-normal w-100"
            >
              Iniciar sesión
            </Button>
          </Form>
          <p className="text-center fs-9 mt-4 mb-2 text-muted">
            o inicia sesión con:
          </p>

          <Button
            variant="outline-light"
            className="justify-content-center d-flex align-items-center w-100"
          >
            <GoogleIcon width="16" height="16" />
            <span className="text-dark">Inicia sesión con Google</span>
          </Button>
        </Card.Body>
      </Card>

      <p className="position-relative text-center fs-8 d-flex align-items-center justify-content-center text-white z-index-1">
        ¿Aún no eres cliente?
        <NavLink to="/register" exact="true" className="ms-2 text-white">
          Regístrate
        </NavLink>
      </p>
    </>
  )
}

export default Login
