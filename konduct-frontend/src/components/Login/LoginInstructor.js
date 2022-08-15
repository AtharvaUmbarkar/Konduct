import { React, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import StyledTextField from '../Custom/StyledTextField';

import UserContext from '../../context/UserContext/UserContext';

const LoginInstructor = () => {

  const navigate = useNavigate();
  const { loginInstructor } = useContext(UserContext);

  const [instructorData, setInstructorData] = useState({
    roll_number: '',
    password: '',
  });

  const handleLoginInstructor = async (e) => {
    e.preventDefault();
    const response = await loginInstructor(instructorData);
    if (response) navigate('/instructor/dashboard');
  }

  const handleInstructorData = (e) => {
    setInstructorData({ ...instructorData, [e.target.name]: e.target.value });
  }

  return (
    <div className='grow flex flex-col justify-center items-center'>
      <div className='text-4xl m-8'>Login as Instructor</div>
      <form method="post" onSubmit={handleLoginInstructor} className='bg-tertiary p-4 rounded-md flex flex-col space-y-5 w-[20rem]'>
        <StyledTextField required color='accent' name='roll_number' label="Roll-Number" variant="outlined" onChange={handleInstructorData} />
        <StyledTextField required color='accent' name='password' label="Password" variant="outlined" type='password' onChange={handleInstructorData} />
        <Button className='w-full h-12' variant='contained' type='submit' onClick={handleLoginInstructor} color='accent'>Login</Button>
      </form>
    </div>
  )
}

export default LoginInstructor