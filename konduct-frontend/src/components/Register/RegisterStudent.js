import { React, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import StyledTextField from '../Custom/StyledTextField';

import UserContext from '../../context/UserContext/UserContext';

const RegisterStudent = () => {

  const navigate = useNavigate();
  const { registerStudent } = useContext(UserContext);

  const [studentData, setStudentData] = useState({
    name: '',
    roll_number: '',
    email: '',
    program: '',
    department: '',
    password: '',
    confirm_password: '',
  });

  const [canSubmit, setCanSubmit] = useState(false);

  const handleRegisterStudent = async (e) => {
    e.preventDefault();
    const response = await registerStudent(studentData);
    if (response) navigate('/student/dashboard');
  }

  const handleStudentData = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (studentData.name &&
      studentData.roll_number &&
      studentData.email &&
      studentData.program &&
      studentData.department &&
      studentData.password &&
      (studentData.password === studentData.confirm_password)) {
      setCanSubmit(true);
    }
    else setCanSubmit(false);
  }, [studentData, canSubmit])

  return (
    <div className='grow flex flex-col justify-center items-center'>
      <div className='text-4xl m-8'>Register as Student</div>
      <form method="post" onSubmit={handleRegisterStudent} className='bg-tertiary p-4 rounded-md flex flex-col space-y-5 w-[20rem]'>
        <StyledTextField required color='accent' name='name' label="Name" variant="outlined" onChange={handleStudentData} />
        <StyledTextField required color='accent' name='roll_number' label="Roll-Number" variant="outlined" onChange={handleStudentData} />
        <StyledTextField required color='accent' name='email' label="Email-Id" variant="outlined" type='email' onChange={handleStudentData} />
        <StyledTextField required color='accent' name='program' label="Program" variant="outlined" onChange={handleStudentData} />
        <StyledTextField required color='accent' name='department' label="Department" variant="outlined" onChange={handleStudentData} />
        <StyledTextField required color='accent' name='password' label="Password" variant="outlined" type='password' onChange={handleStudentData} />
        <StyledTextField error={!canSubmit && Boolean(studentData.confirm_password)} required color='accent' name='confirm_password' label="Confirm Password" variant="outlined" type='password' onChange={handleStudentData} />
        <Button className='w-full h-12' variant='contained' disabled={!canSubmit} type='submit' onClick={handleRegisterStudent} color='accent'>Register</Button>
      </form>
    </div>
  )
}

export default RegisterStudent