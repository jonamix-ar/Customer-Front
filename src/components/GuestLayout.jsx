import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import BackgroundIcons from '@/components/custom/BackgroundIcons'
import logoSrc from '@/assets/images/logos/logo-legalistas.svg'

export default function GuestLayout() {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/mis-causas" />
  }

  const gradient = {
    backgroundImage:
      'linear-gradient(90deg, rgba(7,133,142,0.7175245098039216) 25%, rgba(9,167,178,1) 75%)',
    overflowY: 'auto',
    maxWidth: '100%',
  }

  const maxHeight = {
    height: '100vh',
  }

  return (
    <>
      <div className="position-relative" style={gradient}>
        <BackgroundIcons className="legalistas-icon-top" />
        <BackgroundIcons className="legalistas-icon-bottom" />
        <ToastContainer />
        <div className="pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative z-index-1" style={maxHeight}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8 col-xs-6 col-sm-12 mx-auto">
                <img
                  alt="Legalistas.ar"
                  width={340}
                  height={80}
                  src={logoSrc}
                  className="d-block mx-auto mb-2 mt-5"
                />
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
