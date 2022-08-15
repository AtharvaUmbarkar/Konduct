import { React, useContext } from 'react'
import { useNavigate, NavLink } from "react-router-dom"

import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';

import UserContext from '../../../context/UserContext/UserContext';

const DashBoardSidebarInstructor = () => {

  const navigate = useNavigate();
  const { modifyRole } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    modifyRole('');
    navigate('/home');
  }

  return (
    <div className='sticky top-0 left-0 h-screen flex flex-col items-center bg-tertiary'>
      <div className='mx-8 p-2 my-8 hover:cursor-pointer' onClick={() => { navigate('/home') }}>
        <div className='text-5xl'>Konduct</div>
      </div>
      <div className='flex flex-col p-2 m-2 w-4/5 h-1/4 items-center rounded-md space-y-1'>
        <div className='overflow-hidden text-ellipsis whitespace-nowrap w-full text-center p-1 bg-primary bg-opacity-70 items-center rounded-md text-base'>{localStorage.getItem('name')}</div>
        <div className='text-center p-1 bg-primary bg-opacity-70 w-full items-center rounded-md text-base'>{localStorage.getItem('id')}</div>
      </div>
      <NavLink to={'profile'} className={({ isActive }) => ((isActive ? 'bg-accent text-secondary' : 'text-accent bg-transparent border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent') + 'mx-8 my-2 p-1.5 w-40 flex flex-row justify-center items-center rounded-md')}>
        <PersonIcon className='mx-2' fontSize='small' /><p className='text-center text-inherit'>PROFILE</p>
      </NavLink>
      <NavLink to={'courses'} className={({ isActive }) => ((isActive ? 'bg-accent text-secondary' : 'text-accent bg-transparent border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent') + 'mx-8 my-2 p-1.5 w-40 flex flex-row justify-center items-center rounded-md')}>
        <SchoolIcon className='mx-2' fontSize='small' /><p className='text-center text-inherit'>COURSES</p>
      </NavLink>
      <button onClick={handleLogout} className={'text-accent bg-transparent border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent mx-8 my-2 p-1.5 w-40 flex flex-row justify-center items-center rounded-md mt-auto mb-16'}>
        <LogoutIcon className='mx-2' fontSize='small' /><p className='text-center text-inherit'>LOGOUT</p>
      </button>
    </div>
  )
}

export default DashBoardSidebarInstructor