import { React, useContext } from 'react'
import { useNavigate, NavLink } from "react-router-dom"

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';

import UserContext from '../../../../../context/UserContext/UserContext';

const SubmissionSidebarInstructor = (props) => {

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
        <div className='text-center p-1 bg-primary bg-opacity-70 w-full items-center rounded-md text-base'>{props.course_name}</div>
        <div className='text-center p-1 bg-primary bg-opacity-70 w-full items-center rounded-md text-base'>{props.assignment_name}</div>
      </div>
      <NavLink to={'submissions'} className={({ isActive }) => ((isActive ? 'bg-accent text-secondary' : 'text-accent bg-transparent border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent') + 'mx-8 my-2 p-1.5 w-40 flex flex-row justify-center items-center rounded-md')}>
        <p className='text-center text-inherit'>SUBMISSIONS</p>
      </NavLink>
      {/* <NavLink to={'assignments'} className={({ isActive }) => ((isActive ? 'bg-accent text-secondary' : 'text-accent bg-transparent border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent') + 'mx-8 my-2 p-1.5 w-40 flex flex-row justify-center items-center rounded-md')}>
        <p className='text-center text-inherit'>ASSIGNMENTS</p>
      </NavLink> */}
      {/* <NavLink to={'submissions'} className={({ isActive }) => ((isActive ? 'bg-accent text-secondary' : 'text-accent bg-transparent border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent') + 'mx-8 my-2 p-1.5 w-40 flex flex-row justify-center items-center rounded-md')}>
        <p className='text-center text-inherit'>SUBMISSIONS</p>
      </NavLink> */}
      <div className='flex flex-col mb-16 mt-auto items-center'>
        <NavLink to={`/instructor/course/${props.course_name}/assignments`} className={({ isActive }) => ((isActive ? 'bg-accent text-secondary' : 'text-accent bg-transparent border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent') + 'mx-8 my-2 p-1.5 w-40 flex flex-row justify-center items-center rounded-md')}>
          <ArrowBackIcon className='mr-2' fontSize='small' /><p className='text-center text-inherit'>ASSIGNMENTS</p>
        </NavLink>
        <button onClick={handleLogout} className={'text-accent bg-transparent border border-solid border-accent_dark hover:bg-secondary hover:bg-opacity-[0.02] hover:border-accent mx-8 my-2 p-1.5 w-40 flex flex-row justify-center items-center rounded-md'}>
          <LogoutIcon className='mx-2' fontSize='small' /><p className='text-center text-inherit'>LOGOUT</p>
        </button>
      </div>
    </div>
  )
}

export default SubmissionSidebarInstructor