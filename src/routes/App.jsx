import { useState } from 'react'
import '../index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import ErrorPage from '../pages/ErrorPage'
import Products from '../pages/Products'
import Layout from '../Layout/Layout'
import CheckingOrders from '../pages/CheckingOrders'
import Notification from '../pages/Notification'
import { AllStateProvider } from '../context/AllStateContext'
import CreateProducts from '../pages/CreateProducts'

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
          path: 'checking-orders',
          element: <CheckingOrders />
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
