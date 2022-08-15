import React from 'react'
import { Outlet } from 'react-router-dom'
import SubmissionSidebarInstructor from './SubmissionSidebarInstructor'

const SubmissionsInstructor = (props) => {
  return (
    <div className='flex flex-row'>
      <SubmissionSidebarInstructor course_name={props.course_name} assignment_name={props.assignment_name} />
      <Outlet />
    </div>
  )
}

export default SubmissionsInstructor