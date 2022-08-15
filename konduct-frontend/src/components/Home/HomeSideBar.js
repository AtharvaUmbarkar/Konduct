import { React, useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom"

import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';

import UserContext from '../../context/UserContext/UserContext';

const HomeSideBar = () => {

  const navigate = useNavigate();
  const { modifyRole, role } = useContext(UserContext);

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
      {!localStorage.getItem('token') ?
        <>
          <div className='mx-8 my-2 w-40'>
            <NavLink to={'/login'} className='w-full flex justify-center items-center p-1.5 border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent rounded-sm'><LoginIcon className='mx-2' fontSize='small' /><p className='text-center text-accent'>LOGIN</p></NavLink>
          </div>
          <div className='mx-8 my-2 w-40'>
            <NavLink to={'/register'} className='w-full flex justify-center items-center p-1.5 border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent rounded-sm'><PersonIcon className='mx-2' fontSize='small' /><p className='text-center text-accent'>REGISTER</p></NavLink>
          </div>
        </>
        :
        <>
          <div className='flex flex-col p-2 m-2 w-4/5 h-1/4 items-center rounded-md space-y-1'>
            <div className='overflow-hidden text-ellipsis whitespace-nowrap w-full text-center p-1 bg-primary bg-opacity-70 items-center rounded-md text-base'>{localStorage.getItem('name')}</div>
            <div className='text-center p-1 bg-primary bg-opacity-70 w-full items-center rounded-md text-base'>{localStorage.getItem('id')}</div>
          </div>
          <div className='mx-8 my-2 w-40'>
            <NavLink to={`/${role}/dashboard`} className='w-full flex justify-center items-center p-1.5 border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent rounded-sm'><PersonIcon className='mx-2' fontSize='small' /><p className='text-center text-accent'>DASHBOARD</p></NavLink>
          </div>
          <div className='mx-8 my-2 w-40 mt-auto mb-16'>
            <button onClick={handleLogout} className='w-full flex justify-center items-center p-1.5 border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent rounded-sm'><PersonIcon className='mx-2' fontSize='small' /><p className='text-center text-accent'>LOGOUT</p></button>
          </div>
        </>}
    </div>
  )
}

export default HomeSideBar