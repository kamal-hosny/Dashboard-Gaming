import React from 'react'
import LoginForm from '../components/login/LoginForm'

const Login = () => {
  return (
    <div className='login relative'>
        <div className='fixed left-0 top-0 flex w-full h-full justify-center items-center'>
            <LoginForm />
        </div>
    </div>
  )
}

export default Login