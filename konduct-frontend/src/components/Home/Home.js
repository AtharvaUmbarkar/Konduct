import React from 'react'
import HomeDescription from './HomeDescription'
import HomeSidebar from './HomeSideBar'

const Home = () => {
  return (
    <div className='flex flex-row'>
      <HomeSidebar />
      <HomeDescription />
    </div>
  )
}

export default Home