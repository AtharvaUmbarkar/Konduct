import { React, useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";

import LoginSideBar from './LoginSideBar'

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  })

  return (
    <div className='flex flex-row'>
      <LoginSideBar />
      <Outlet />
    </div>
  )
}

export default Login