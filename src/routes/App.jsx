import React, { useState, Suspense } from 'react'
import '../index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Login'
import Layout from '../Layout/Layout'
import Notification from '../pages/Notification'
import { AllStateProvider } from '../context/AllStateContext'

// Lazy-loaded components
const ErrorPage = React.lazy(() => import("../pages/ErrorPage"))
const Products = React.lazy(() => import("../pages/Products"))
const CreateProducts = React.lazy(() => import("../pages/CreateProducts"))
const EditProducts = React.lazy(() => import("../pages/EditProducts"))
const Users = React.lazy(() => import("../pages/Users"))

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
          element: (<Products />),
        },
        {
          path: 'products/create',
          element: (<CreateProducts />),
        },
        {
          path: 'products/edit/:id',
          element: (<EditProducts />),
        },
        {
          path: 'users',
          element: (<Users />)
        },
        {
          path: 'notification',
          element: <Notification />
        }
      ]
    }
  ]);

  return (
    <AllStateProvider>
      <Suspense fallback={<div className="loading-container bg-mainColorBackground w-screen h-screen flex items-center justify-center text-colorText1">loading...</div>}>
        <RouterProvider router={Routing} />
      </Suspense>
    </AllStateProvider>
  );
}

export default App;
