/* eslint-disable react-hooks/exhaustive-deps */
import { React, useContext, useEffect } from 'react'
// import { NavLink } from 'react-router-dom'
import { Accordion } from 'react-accessible-accordion';

import '../../../../Custom/Accordian.css'

import SubmissionContext from '../../../../../context/SubmissionContext/SubmissionContext';

import SubmissionInstructor from './SubmissionInstructor';

const SubmissionsHomeInsructor = (props) => {

  const { submissions, fetchSubmissions } = useContext(SubmissionContext);

  useEffect(() => {
    fetchSubmissions({
      course_id: props.course_name,
      name: props.assignment_name,
    });
  }, [])

  return (
    <div className='flex flex-col grow items-center'>
      <div className='text-4xl m-8'>Submissions</div>
      <Accordion allowZeroExpanded className='my-4 flex flex-col items-start w-4/5 space-y-1 shadow-xl'>
        {submissions.map((submission, idx) => {
          return (
            <SubmissionInstructor key={submission._id} course_name={props.course_name} submission={submission} />
          )
        })}
      </Accordion>
    </div>
  )
}

export default SubmissionsHomeInsructor