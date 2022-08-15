/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useContext } from 'react'
import { Outlet, useNavigate } from "react-router-dom";

import CourseContext from '../../../context/CourseContext/CourseContext';

const CourseDashBoardInstructor = () => {

  const navigate = useNavigate();
  const { fetchUserCourses } = useContext(CourseContext);

  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('role') === 'student') {
      navigate('/home');
    }

    if (localStorage.getItem('token')) {
      fetchUserCourses();
    }
  }, []);

  return (
    <div className=''>
      <Outlet />
    </div>
  )
}

export default CourseDashBoardInstructor