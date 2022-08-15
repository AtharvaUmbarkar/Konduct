/* eslint-disable react-hooks/exhaustive-deps */
import { React, useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import DashBoardSidebarStudent from './DashboardSidebarStudent'

import UserContext from '../../../context/UserContext/UserContext';
import CourseContext from '../../../context/CourseContext/CourseContext';

const DashBoardStudent = () => {

  const navigate = useNavigate();
  const { fetchUserProfile } = useContext(UserContext);
  const { fetchUserCourses, fetchAvailableCourses } = useContext(CourseContext)

  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('role') === 'instructor' || localStorage.getItem('role') === '') {
      navigate('/home');
    }

    if (localStorage.getItem('token')) {
      fetchUserProfile();
      fetchUserCourses();
      fetchAvailableCourses();
    }
  }, [])

  return (
    <div className='flex flex-row'>
      <DashBoardSidebarStudent />
      <Outlet />
    </div>
  )
}

export default DashBoardStudent