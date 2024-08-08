import { useState } from 'react'
import '../index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Login'
import ErrorPage from '../pages/ErrorPage'
import Products from '../pages/Products'
import Layout from '../Layout/Layout'
import Notification from '../pages/Notification'
import { AllStateProvider } from '../context/AllStateContext'
import CreateProducts from '../pages/CreateProducts'
import EditProducts from '../pages/EditProducts'
import Users from '../pages/Users'


function App() {
  const Routing = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <ErrorPage />

    },
    {
      path: '/login',
      element: <Login />,
    },


    
    {
      element: <Layout />,
      children: [
        {
          path: '/products',
          element: <Products />,
        },
        {
          path: 'products/create',
          element: <CreateProducts />,
        },
        {
          path: 'products/edit/:id',
          element: <EditProducts />,
        },
        {
          path: 'users',
          element: <Users />
        },
        {
          path: 'notification',
          element: <Notification />
        }
      ]
    }

  ])
  return (
    <>
      <AllStateProvider>
        <RouterProvider router={Routing} />
      </AllStateProvider>
    </>
  )
}

export default App
