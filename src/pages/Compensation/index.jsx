import React, { useState } from 'react'
import {
  ButtonGroup,
  Form,
  InputGroup,
  ToggleButton,
  Button,
  Row,
  Col,
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import Api from '@/services/Api'
import { useNavigate } from 'react-router-dom'

export const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const Compensation = () => {
  const [checked, setChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('1')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const radios = [
    { name: 'En el trabajo', value: '1' },
    { name: 'In-Itínere', value: '2' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const {
      first_name,
      last_name,
      email,
      salario,
      incapacidad,
      porcentaje,
      birthday,
      accidenteDate,
    } = e.target.elements

    // salario: parseFloat(salario.value),
    // incapacidad: parseFloat(incapacidad.value),
    // porcentaje: parseFloat(porcentaje.value),
    // birthday: birthday.value,
    // accidenteDate: accidenteDate.value,

    const body = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      salario: parseFloat(salario.value),
      incapacidad: parseFloat(incapacidad.value),
      porcentaje: parseFloat(porcentaje.value),
      birthday: birthday.value,
      accidenteDate: accidenteDate.value,
    }

    try {
      const resp = await Api.post('/calculadora-de-indemnizacion', body)
      if (resp.status === 201) {
        setIsLoading(false)
        toast.success('Usuario registrado exitosamente')
        // navigate('/') // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
        console.log('Datos que se envían al servidor:', body)
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
      } else {
        toast.error(
          'Error al registrar el usuario. Por favor, inténtalo de nuevo.'
        )
      }
    }
  }

  return (
    <>
      {/*  */}
      <Form action="#" method="post" onSubmit={handleSubmit}>
        <div className="d-flex align-items-center p-3 my-3 text-white bg-dark rounded shadow-sm position-relative z-index-1">
          <h1 className="fs-7">
            Calculadora de Indemnización por Accidente Laboral - ART
          </h1>
        </div>
        <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h6 className="border-bottom pb-2 mb-3 mt-2">Datos personales</h6>
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
          <h6 className="border-bottom pb-2 mb-3 mt-2">
            Ingresa tu Salario Actual
          </h6>
          <Form.Group className="mb-3" controlId="ingresos">
            <Form.Control
              className="form-control"
              required
              autoFocus
              name="salario"
              type="number"
              placeholder="Ingresa tu Salario Actual"
            />
          </Form.Group>
          <h6 className="border-bottom pb-2 mb-3 mt-2">
            Selecciona el tipo de accidente
          </h6>
          <ButtonGroup className="w-100 mb-3">
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-primary' : 'outline-primary'}
                name="incapacidad"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <InputGroup className="mb-3">
            <Form.Control
              className="form-control"
              required
              autoFocus
              name="porcentaje"
              type="number"
              placeholder="Porcentaje de Incapacidad"
              min={0}
              step={0.01}
            />
            <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
          </InputGroup>
          <Form.Group className="mb-3" id="lastName">
            <Form.Label className="form-label fw-normal fs-9 text-muted">
              Fecha de nacimiento
            </Form.Label>
            <Form.Control
              className="form-control"
              required
              autoFocus
              name="birthday"
              type="date"
              // No necesitas guardar la fecha de nacimiento en el estado
            />
          </Form.Group>
          <Form.Group className="mb-3" id="lastName">
            <Form.Label className="form-label fw-normal fs-9 text-muted">
              Fecha del accidente
            </Form.Label>
            <Form.Control
              className="form-control"
              autoFocus
              name="accidenteDate"
              type="date"
              // No necesitas guardar la fecha de nacimiento en el estado
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="d-block w-100">
            Calculá tu indemnización
          </Button>{' '}
        </div>
      </Form>
    </>
  )
}

export default Compensation
