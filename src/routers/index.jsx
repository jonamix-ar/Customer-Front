import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from '@/components/GuestLayout'
import ProtectedLayout from '@/components/ProtectedLayout'

const Login = lazy(() => import('@/pages/Auth/Login'))
const Register = lazy(() => import('@/pages/Auth/Register'))

// Protected
const Procedure = lazy(() => import('@/pages/Procedure'))
const ProcedureView = lazy(() => import('@/pages/ProcedureView'))
const Compensation = lazy(() => import('@/pages/Compensation'))
// const Profile = lazy(() => import('@/pages/Profile'))
// const MyAccount = lazy(() => import('@/pages/Account'))

// Not found
const NotFound = lazy(() => import('@/pages/NotFound'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/consultas',
        children: [
          {
            path: 'calcula-tu-indemnización',
            element: <Compensation />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        path: '/mis-causas',
        element: <Procedure />,
      },
      {
        path: '/mis-causas/ver/:causeId',
        element: <ProcedureView />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
