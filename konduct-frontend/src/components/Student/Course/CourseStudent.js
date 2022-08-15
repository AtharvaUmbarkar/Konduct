/* eslint-disable react-hooks/exhaustive-deps */
import { React, useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import CourseSidebarStudent from './CourseSidebarStudent'

import CourseContext from '../../../context/CourseContext/CourseContext'

const CourseStudent = (props) => {

  const { fetchCourseData } = useContext(CourseContext);

  useEffect(() => {
    fetchCourseData(props.course_name);
  }, []);

  return (
    <div className='flex flex-row'>
      <CourseSidebarStudent course_name={props.course_name} />
      <Outlet />
    </div>
  )
}

export default CourseStudent