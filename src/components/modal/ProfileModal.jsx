import React from 'react'
import { Modal } from 'react-bootstrap'
import ProfileForm from '@/components/forms/ProfileForm'

const ProfileModal = ({ show, closeProfile, user }) => {
  return (
    <Modal
      show={show}
      size="lg"
      centered
      onHide={closeProfile}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-7">Editar perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProfileForm user={user} />
      </Modal.Body>
    </Modal>
  )
}

export default ProfileModal
