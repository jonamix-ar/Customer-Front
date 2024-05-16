import Api from '@/services/Api'
import React, { useState, useEffect } from 'react'
import Avatar from 'react-avatar'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { FileUploader } from 'react-drag-drop-files'

const fileTypes = ['JPG', 'PNG', 'GIF']

const ProfileForm = ({ user }) => {
  const [provincias, setProvincias] = useState([])
  const [ciudades, setCiudades] = useState([])
  const [selectedProvincia, setSelectedProvincia] = useState('')
  const [formData, setFormData] = useState({
    // Define aquí los campos del formulario y sus valores iniciales basados en los datos del usuario
    firstName: user.first_name || '',
    lastName: user.last_name || '',
    email: user.email || '',
    state: user.profile.state || '',
    locality: user.profile.locality || '',
    avatar: user.profile.avatar !== undefined ? user.profile.avatar : '',
  })

  useEffect(() => {
    const obtenerProvincias = async () => {
      try {
        const response = await Api.get('/states')
        setProvincias(response.data)
      } catch (error) {
        console.error('Error al obtener provincias:', error)
      }
    }

    obtenerProvincias()
  }, [])

  useEffect(() => {
    const obtenerCiudades = async () => {
      if (formData.state) {
        try {
          const response = await Api.get(`/states/${formData.state}/cities`)
          setCiudades(response.data)
        } catch (error) {
          console.error('Error al obtener ciudades:', error)
        }
      }
    }

    obtenerCiudades()
  }, [formData.state])

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name)
    console.log(value)
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0] // Obtener el primer archivo seleccionado
    setFormData({ ...formData, avatar: file }) // Actualizar el estado con el archivo seleccionado
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Crear un nuevo objeto FormData
    const formDataToSend = new FormData()

    // Agregar los campos del formulario al objeto FormData
    formDataToSend.append('firstName', formData.firstName)
    formDataToSend.append('lastName', formData.lastName)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('state', formData.state)
    formDataToSend.append('locality', formData.locality)

    // Verificar si hay un archivo seleccionado y agregar solo su nombre al objeto FormData
    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar.name)
    } else {
      // Si no hay un nuevo archivo seleccionado, agregar el valor actual del avatar del usuario al objeto FormData
      formDataToSend.append('avatar', user.profile.avatar || '')
    }

    try {
      await Api.post('user/profile', formDataToSend)
      console.log(
        'Datos del formulario enviados correctamente:',
        formDataToSend
      )
    } catch (error) {
      console.error('Error al enviar los datos del formulario:', error)
    }
  }

  /*validated={validated}*/
  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-2">
          <Form.Group as={Col} md="4" className="mb-2">
            {!formData.avatar || formData.avatar === 'legalistas-avatar.jpg' ? (
              <Avatar
                name={userNameComplete}
                size="32"
                textSizeRatio={1.75}
                round="20px"
                className={styles.avatar}
              />
            ) : (
              <Image
                src={`https://clientes.legalistas.ar/storage/profile_pic/${formData.avatar}`}
                rounded
                thumbnail
                style={{ width: '100px' }}
              />
            )}
          </Form.Group>
          <Form.Group as={Col} md="8" controlId="firstName" className="mb-2">
            <Form.Label className="required">Imagen de perfil</Form.Label>
            <Form.Control
              type="file"
              name="avatar"
              types={fileTypes}
              onChange={handleFileChange}
            />
          </Form.Group>
        </Row>
        <hr />
        <Row className="mb-2">
          <Form.Group as={Col} md="6" controlId="firstName" className="mb-2">
            <Form.Label className="required">Nombre</Form.Label>
            <Form.Control
              name="firstName"
              required
              type="text"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="lastName" className="mb-2">
            <Form.Label className="required">Apellido</Form.Label>
            <Form.Control
              name="lastName"
              required
              type="text"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="12" controlId="email">
            <Form.Label className="required">Correo Electrónico</Form.Label>
            <Form.Control
              name="email"
              required
              type="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6" controlId="state" className="mb-2">
            <Form.Label className="required">Provincia</Form.Label>
            <Form.Group controlId="provincia">
              <Form.Select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Selecciona una provincia...</option>
                {provincias.map((provincia) => (
                  <option key={provincia.id} value={provincia.id}>
                    {provincia.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="locality" className="mb-2">
            <Form.Label className="required">Ciudad</Form.Label>
            <Form.Group controlId="locality">
              <Form.Select
                name="locality"
                value={formData.locality}
                onChange={handleChange}
              >
                <option value="">Selecciona una ciudad...</option>
                {ciudades.map((ciudad) => (
                  <option key={ciudad.id} value={ciudad.id}>
                    {ciudad.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Primary
        </Button>{' '}
      </Form>
    </>
  )
}

export default ProfileForm
