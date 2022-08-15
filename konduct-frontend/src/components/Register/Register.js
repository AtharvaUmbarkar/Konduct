import { React, useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";

import RegisterSideBar from './RegisterSideBar'

const Register = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  })

  return (
    <div className='flex flex-row'>
      <RegisterSideBar />
      <Outlet />
    </div>
  )
}

export default Register