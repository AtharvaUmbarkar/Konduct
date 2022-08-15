import { React } from 'react'
import { useNavigate, NavLink } from "react-router-dom"

import LoginIcon from '@mui/icons-material/Login';

const LoginSideBar = () => {

  const navigate = useNavigate();

  return (
    <div className='sticky top-0 left-0 h-screen flex flex-col items-center bg-tertiary'>
      <div className='mx-8 p-2 my-8 hover:cursor-pointer' onClick={() => { navigate('/home') }}>
        <div className='text-5xl'>Konduct</div>
      </div>
      <NavLink to={'instructor'} className={({ isActive }) => ((isActive ? 'bg-accent text-secondary' : 'text-accent bg-transparent border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent') + 'mx-8 my-2 p-1.5 w-40 flex flex-row justify-center items-center rounded-sm')}>
        <LoginIcon className='mx-2' fontSize='small' /><p className='text-center text-inherit'>LOGIN AS INSTRUCTOR</p>
      </NavLink>
      <NavLink to={'student'} className={({ isActive }) => ((isActive ? 'bg-accent text-secondary' : 'text-accent bg-transparent border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent') + 'mx-8 my-2 p-1.5 w-40 flex flex-row justify-center items-center rounded-sm')}>
        <LoginIcon className='mx-2' fontSize='small' /><p className='text-center text-inherit'>LOGIN AS STUDENT</p>
      </NavLink>
    </div>
  )
}

export default LoginSideBar