import React from 'react'

const HomeDescription = () => {
  return (
    <div className='grow text-center flex flex-col justify-center items-center'>
      <img className='h-40 w-4h-40' src="./images/logo.svg" alt="not found" />
      <div className='text-2xl m-8'>Konduct is an online academic course manager. It enables instructors to post assignments, receive submissions and grade them. As well as it allows students to access course material, assignments and grades.</div>
      <div className='text-xl'><span className='text-accent'>Login/Register</span> to continue</div>
    </div>
  )
}

export default HomeDescription