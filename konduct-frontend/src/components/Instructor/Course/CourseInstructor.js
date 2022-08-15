/* eslint-disable react-hooks/exhaustive-deps */
import { React, useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import CourseSidebarInstructor from './CourseSidebarInstructor'

import CourseContext from '../../../context/CourseContext/CourseContext'
import AssignmentContext from '../../../context/AssignmentContext/AssignmentContext'

const CourseInstructor = (props) => {

  const { fetchCourseData } = useContext(CourseContext);
  const { fetchAssignments } = useContext(AssignmentContext);

  useEffect(() => {
    fetchCourseData(props.course_name);
    fetchAssignments(props.course_name);
  }, []);

  return (
    <div className='flex flex-row'>
      <CourseSidebarInstructor course_name={props.course_name} />
      <Outlet />
    </div>
  )
}

export default CourseInstructor