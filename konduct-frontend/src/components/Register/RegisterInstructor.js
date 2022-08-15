import { React, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import StyledTextField from '../Custom/StyledTextField';

import UserContext from '../../context/UserContext/UserContext';

const RegisterInstructor = () => {

  const navigate = useNavigate();
  const { registerInstructor } = useContext(UserContext);

  const [instructorData, setInstructorData] = useState({
    name: '',
    roll_number: '',
    email: '',
    department: '',
    password: '',
    confirm_password: '',
  });

  const [canSubmit, setCanSubmit] = useState(false);

  const handleRegisterInstructor = async (e) => {
    e.preventDefault();
    const response = await registerInstructor(instructorData);
    if (response) navigate('/instructor/dashboard');
  }


  const handleInstructorData = (e) => {
    setInstructorData({ ...instructorData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (instructorData.name &&
      instructorData.roll_number &&
      instructorData.email &&
      instructorData.department &&
      instructorData.password &&
      (instructorData.password === instructorData.confirm_password)) {
      setCanSubmit(true);
    }
    else setCanSubmit(false);
  }, [instructorData, canSubmit])


  return (
    <div className='grow flex flex-col justify-center items-center'>
      <div className='text-4xl m-8'>Register as Instructor</div>
      <form method="post" onSubmit={handleRegisterInstructor} className='bg-tertiary p-4 rounded-md flex flex-col space-y-5 w-[20rem]'>
        <StyledTextField required color='accent' name='name' label="Name" variant="outlined" onChange={handleInstructorData} />
        <StyledTextField required color='accent' name='roll_number' label="Roll-Number" variant="outlined" onChange={handleInstructorData} />
        <StyledTextField required color='accent' name='email' label="Email-Id" variant="outlined" type='email' onChange={handleInstructorData} />
        <StyledTextField required color='accent' name='department' label="Department" variant="outlined" onChange={handleInstructorData} />
        <StyledTextField required color='accent' name='password' label="Password" variant="outlined" type='password' onChange={handleInstructorData} />
        <StyledTextField error={!canSubmit && Boolean(instructorData.confirm_password)} required color='accent' name='confirm_password' label="Confirm Password" variant="outlined" type='password' onChange={handleInstructorData} />
        <Button className='w-full h-12' variant='contained' disabled={!canSubmit} type='submit' onClick={handleRegisterInstructor} color='accent'>Register</Button>
      </form>
    </div>
  )
}

export default RegisterInstructor