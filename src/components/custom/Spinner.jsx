import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const LoadingSpinner = ({ size = 'md', variant = 'primary' }) => {
  return (
    <Spinner animation="border" role="status" size={size} variant={variant}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default LoadingSpinner
