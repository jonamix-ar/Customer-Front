import React, { useState } from 'react'
import styles from '@/layout/Header/header.module.css'
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  NavItem,
  NavLink,
  Modal,
  Offcanvas,
  Image,
} from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive'
import logoSrc from '@/assets/images/logos/logo-legalistas.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faComments,
  faEnvelope,
} from '@fortawesome/free-regular-svg-icons'
import { useAuth } from '@/contexts/AuthContext'
import Api from '@/services/Api'
import Avatar from 'react-avatar'
import Notification from '@/components/Notification'
import ProfileModal from '@/components/modal/ProfileModal'
import {
  faCalculator,
  faScaleBalanced,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const { user, setUser } = useAuth()
  const [expanded, setExpanded] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const handleToggle = () => setExpanded(!expanded)
  const closeMenu = () => setExpanded(false)

  const fullName = `${user.first_name} ${user.last_name}`
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const handleLogout = async () => {
    const token = localStorage.getItem('token') // Obtener el token del localStorage

    try {
      const resp = await Api.post('/logout', {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token al encabezado de la solicitud
        },
      })

      if (resp.status === 200) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
        window.location.href = '/' // Redirigir al usuario a la página de inicio después del logout
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      // Manejar el error de manera apropiada, por ejemplo, mostrando un mensaje al usuario
    }
  }

  const handleProfileClick = () => {
    setShowProfile(true)
  }

  const handleCloseProfile = () => {
    setShowProfile(false)
  }

  const mobileNavbar = (
    <Navbar
      expand="lg"
      data-bs-theme="dark"
      className={`${styles.navbar} shadow-custom`}
    >
      <Container>
        <Navbar.Toggle
          aria-controls={`mobileMenu-expand-lg`}
          className={styles.navbarToggler}
        />
        <Nav className="ms-auto d-flex justify-content-center flex-row">
          <Nav.Link
            href="#home"
            className="me-4 d-flex align-items-center  position-relative"
          >
            <FontAwesomeIcon icon={faBell} className="fs-6" />
            <Notification style={styles.alertNotification} />
          </Nav.Link>
          <Nav.Link href="#features" className="me-3 d-flex align-items-center">
            <FontAwesomeIcon icon={faEnvelope} className="fs-6" />
          </Nav.Link>
          <Dropdown as={NavItem} key="start">
            <Dropdown.Toggle as={NavLink}>
              <Avatar
                name={fullName}
                size="32"
                textSizeRatio={1.75}
                round="20px"
                className={styles.avatar}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute dropdown-menu-end">
              <Dropdown.Item href="/mis-causas">Mis Casos</Dropdown.Item>
              <Dropdown.Item href="/consultas">Consultas</Dropdown.Item>
              <Dropdown.Item onClick={handleProfileClick}>
                Mi cuenta
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Salir</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <Navbar.Offcanvas
          className="w-75 shadow"
          id={`mobileMenu-expand-lg`}
          aria-labelledby={`mobileMenu-expand-lg`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`mobileMenu-expand-lg`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="shadow-custom">
            <Nav className="justify-content-end flex-grow-1 w-100">
              <Nav.Link
                href="/mis-causas"
                className="me-2 d-flex align-items-center position-relative pb-4"
              >
                <FontAwesomeIcon
                  icon={faScaleBalanced}
                  className="fs-6 text-white"
                />
                <span className="ms-2 text-white">Mis Casos</span>
              </Nav.Link>
              <Nav.Link
                href="/consultas"
                className="me-2 d-flex align-items-center position-relative pb-4"
              >
                <FontAwesomeIcon
                  icon={faComments}
                  className="fs-6 text-white"
                />
                <span className="ms-2 text-white">Consultas</span>
              </Nav.Link>
              <Nav.Link
                href="/calculator"
                className="me-2 d-flex align-items-center position-relative pb-4"
              >
                <FontAwesomeIcon
                  icon={faCalculator}
                  className="fs-6 text-white"
                />
                <span className="ms-2 text-white">Calculadora</span>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )

  const desktopNavbar = (
    <Navbar
      key="lg"
      expand="lg"
      data-bs-theme="dark"
      className={styles.navbar}
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="Legalistas.ar"
            width={250}
            height={50}
            src={logoSrc}
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#home"
              className="me-2 d-flex align-items-center  position-relative"
            >
              <FontAwesomeIcon icon={faBell} className="fs-6" />
              <Notification style={styles.alertNotification} />
            </Nav.Link>
            <Nav.Link
              href="#features"
              className="me-2 d-flex align-items-center"
            >
              <FontAwesomeIcon icon={faEnvelope} className="fs-6" />
            </Nav.Link>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink}>
                <span className="me-2 text-white align-middle fs-8">
                  {fullName}
                </span>
                <Avatar
                  name={fullName}
                  size="32"
                  textSizeRatio={1.75}
                  round="20px"
                  className={styles.avatar}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/mis-causas">Mis Casos</Dropdown.Item>
                <Dropdown.Item href="/consultas">Consultas</Dropdown.Item>
                <Dropdown.Item onClick={handleProfileClick}>
                  Mi cuenta
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Salir</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

  return (
    <>
      {isTabletOrMobile ? mobileNavbar : desktopNavbar}
      <ProfileModal
        show={showProfile}
        closeProfile={handleCloseProfile}
        user={user}
      />
    </>
  )
}

export default Header
