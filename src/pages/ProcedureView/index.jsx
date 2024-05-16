import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useAuth } from '@/contexts/AuthContext'
import Api from '@/services/Api'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '@/components/custom/Spinner' // Importa tu componente de carga
import CauseTitle from '@/components/ProcedureView/CauseTitle'
import CauseDetails from '@/components/ProcedureView/CauseDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faGear } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@/utils/helpers/date'

const ProcedureView = () => {
  const { user } = useAuth()
  const { causeId } = useParams()
  const [causeData, setCauseData] = useState(null) // Datos de la causa
  const [loading, setLoading] = useState(true) // Estado de carga global
  const fullName = `${user.first_name} ${user.last_name}`

  useEffect(() => {
    async function fetchCauseById() {
      try {
        const token = localStorage.getItem('token')

        const resp = await Api.post(
          '/causes/show/',
          { causeId: causeId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(token)
        if (resp.status >= 200 && resp.status < 300) {
          setCauseData(resp.data.data) // Actualizamos los datos de la causa
        } else {
          console.error('Mensaje de error:', resp.data.message)
        }
      } catch (error) {
        console.error('Error fetching cause:', error)
      } finally {
        setLoading(false) // Establecemos el estado de carga como falso independientemente del resultado de la solicitud
      }
    }

    fetchCauseById()
  }, [causeId])

  return (
    <>
      <Row>
        {loading ? (
          <LoadingSpinner size="lg" variant="primary" /> // Muestra el componente de carga mientras los datos se están cargando
        ) : (
          <>
            {causeData ? (
              <>
                <Col lg={12}>
                  <CauseTitle
                    fullName={fullName}
                    defendantInterveners={causeData.cause.defendant_interveners}
                    processTypeName={causeData.processType.name}
                    startDate={formatDate(causeData.cause.startDate)}
                  />
                </Col>
                <Col lg={8}>
                  <CauseDetails
                    court={causeData.jurisdictionsCompetences.name}
                    address={`S/*N 23232`}
                    jurisdiction={`LA calle`}
                    processType={`OTRO MAS`}
                    proceduralStage={`MAs y Mas`}
                  />
                </Col>
                <Col lg={4}></Col>
              </>
            ) : (
              <LoadingSpinner size="lg" variant="primary" />
            )}
          </>
        )}
      </Row>
    </>
  )
}

export default ProcedureView
