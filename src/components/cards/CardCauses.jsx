import { useAuth } from '@/contexts/AuthContext'
import { Row, Col, Card, Button } from 'react-bootstrap'
import BtnLoadDocument from '@/components/buttons/BtnLoadDocument'
import { Link } from 'react-router-dom'

const CardCauses = (props) => {
  const { user } = useAuth()
  const fullName = `${user.first_name} ${user.last_name}`

  const handleLoadDocument = () => {
    // Aquí puedes agregar la lógica para cargar el documento
    console.log('Documento cargado')
  }

  return (
    <>
      {props.causes.map((data, index) => {
        // Reemplazar :name por el valor de fullName en el mensaje
        const message = data.message.replace(
          /:button/,
          `<a href="" class="btn btn-primary">Continuar formulario</a>`
        )

        return (
          <Row key={`${data.cause.id}-${index}`}>
            <Col lg="12" className="mb-2">
              <h2>
                {data.processType.name} Nº {data.cause.cuij}
              </h2>
            </Col>
            <Col lg="12" className="mb-2">
              <Row>
                <Col lg="6">
                  <p>Estado de tu caso</p>
                </Col>
                <Col lg="6" className="text-end">
                  <Link to={`/mis-causas/ver/${data.cause.id}`}>Ver detalle</Link>{' '}
                </Col>
              </Row>
            </Col>
            <Col lg="12" className="">
              <Card className="shadow-sm">
                <Card.Header>
                  <h3 className="text-uppercase">
                    {data.title.replace(/:name/g, fullName)}
                  </h3>
                </Card.Header>
                <Card.Body>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: message,
                    }}
                  ></p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )
      })}
    </>
  )
}

export default CardCauses
