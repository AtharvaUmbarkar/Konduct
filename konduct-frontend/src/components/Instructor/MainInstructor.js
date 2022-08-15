import { React, useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";

const MainInstructor = () => {
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

export default MainInstructor