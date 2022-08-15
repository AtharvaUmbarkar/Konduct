/* eslint-disable react-hooks/exhaustive-deps */
import { React, useContext, useEffect } from 'react'
import { Accordion } from 'react-accessible-accordion';

import '../../Custom/Accordian.css'

import AssignmentContext from '../../../context/AssignmentContext/AssignmentContext';

import AddAssignment from './Assignment/AddAssignment';
import AssignmentInstructor from './Assignment/AssignmentInstructor';

const CourseAssignmentsInstructor = (props) => {

  const { assignments, fetchAssignments } = useContext(AssignmentContext);

  useEffect(() => {
    fetchAssignments(props.course_name);
  }, [])

  return (
    <div className='flex flex-col grow items-center'>
      <div className='text-4xl m-8'>Assignments</div>
      <Accordion allowZeroExpanded className='my-4 flex flex-col items-start w-4/5 space-y-1 shadow-xl'>
        <AddAssignment course_name={props.course_name}/>
        {assignments.map((assignment, idx) => {
          return (
            <AssignmentInstructor key={assignment.name} course_name={props.course_name} assignment={assignment}/>
          )
        })}
      </Accordion>
    </div>
  )
}

export default CourseAssignmentsInstructor