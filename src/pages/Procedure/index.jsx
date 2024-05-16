import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useAuth } from '@/contexts/AuthContext'
import Api from '@/services/Api'
import Intro from '@/components/Intro'
import CardCauses from '@/components/cards/CardCauses'
import { toast } from 'react-toastify'

const Procedure = () => {
  const { user } = useAuth()

  const [causes, setCauses] = useState([])

  useEffect(() => {
    async function fetchCauses() {
      try {
        const token = localStorage.getItem('token') // Asume que el token se almacena en el almacenamiento local
        const userId = user.id // Obtener el userId del usuario

        const resp = await Api.post(
          '/causes',
          { id: userId }, // Los datos del usuario se envían directamente como el cuerpo de la solicitud
          {
            headers: {
              Authorization: `Bearer ${token}`, // Adjuntar el token en el encabezado de autorización
            },
          }
        )

        if (resp.status >= 200 && resp.status < 300) {
          setCauses(resp.data.causes)
        } else {
          toast.error(resp.data.message, {
            icon: true,
            position: 'top-right',
          })
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // No hagas nada si la respuesta es 404 (Not Found)
          // Esto evitará que se muestre un mensaje de error en la consola
        } else {
          // Si se produce un error distinto a 404, imprímelo en la consola
          toast.error(error.response.data.message, {
            icon: true,
            position: 'top-right',
          })
        }
      }
    }

    fetchCauses(1)
  }, [])

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={12}>
            <h1 className="text-left text-capitalize">
              Tus casos, {user.first_name}
            </h1>
            <p className="fs-8 fw-normal"></p>
            <hr className="w-100 my-4" />
          </Col>
        </Row>
        {causes && causes.length > 0 ? (
          <CardCauses causes={causes} />
        ) : (
          <Intro />
        )}
      </Container>
    </>
  )
}

export default Procedure
