import { React, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import StyledTextField from '../Custom/StyledTextField';

import UserContext from '../../context/UserContext/UserContext';

const LoginStudent = () => {

  const navigate = useNavigate();
  const { loginStudent } = useContext(UserContext);

  const [studentData, setStudentData] = useState({
    roll_number: '',
    password: '',
  });

  const handleLoginStudent = async (e) => {
    e.preventDefault();
    const response = await loginStudent(studentData);
    if (response) navigate('/student/dashboard');
  }

  const handleStudentData = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  }

  return (
    <div className='grow flex flex-col justify-center items-center'>
      <div className='text-4xl m-8'>Login as Student</div>
      <form method="post" onSubmit={handleLoginStudent} className='bg-tertiary p-4 rounded-md flex flex-col space-y-5 w-[20rem]'>
        <StyledTextField required color='accent' name='roll_number' label="Roll-Number" variant="outlined" onChange={handleStudentData} />
        <StyledTextField required color='accent' name='password' label="Password" variant="outlined" type='password' onChange={handleStudentData} />
        <Button className='w-full h-12' variant='contained' type='submit' onClick={handleLoginStudent} color='accent'>Login</Button>
      </form>
    </div>
  )
}

export default LoginStudent