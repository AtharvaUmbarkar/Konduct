import { React, useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";

const MainStudent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/home');
    }
  })

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default MainStudent