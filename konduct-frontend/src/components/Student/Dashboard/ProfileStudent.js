import { React, useContext } from 'react'

import { Avatar } from '@mui/material'

import UserContext from '../../../context/UserContext/UserContext';

const ProfileStudent = () => {
  const { userProfile } = useContext(UserContext);

  return (
    <div className='grow flex flex-col justify-start items-center'>
      <div className='text-4xl m-8'>Profile</div>
      <div className='flex flex-col space-y-2 my-4 items-start w-4/5'>
        <Avatar className='my-2 mb-6' src='' alt='' sx={{ height: '6rem', width: '6rem' }} />
        <div className='text-lg flex flex-row w-full'><span className='text-accent w-1/4'>Name: </span><span>{userProfile.name}</span></div>
        <div className='text-lg flex flex-row w-full'><span className='text-accent w-1/4'>Roll Number: </span><span>{userProfile.roll_number}</span></div>
        <div className='text-lg flex flex-row w-full'><span className='text-accent w-1/4'>Email-Id: </span><span>{userProfile.email}</span></div>
        <div className='text-lg flex flex-row w-full'><span className='text-accent w-1/4'>Program: </span><span>{userProfile.program}</span></div>
        <div className='text-lg flex flex-row w-full'><span className='text-accent w-1/4'>Department: </span><span>{userProfile.department}</span></div>
      </div>
    </div>
  )
}

export default ProfileStudent