/* eslint-disable react-hooks/exhaustive-deps */
import { React, useContext, useState } from 'react'
// import { NavLink } from 'react-router-dom'
import { AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, AccordionItemState, } from 'react-accessible-accordion';

import moment from 'moment';
import '../../../../Custom/Accordian.css'

import SubmissionContext from '../../../../../context/SubmissionContext/SubmissionContext';

const SubmissionInstructor = (props) => {

  const submission = props.submission;
  const { totalMarks, gradeSubmission } = useContext(SubmissionContext);
  const [marks, setMarks] = useState('');

  const getDate = (date) => {
    return date.format("DD/MM/YYYY HH:mm:ss")
  }

  const handleOnChange = (e) => {
    setMarks(e.target.value);
  }

  const handleGradeSubmission = async () => {
    if (!marks) return;
    await gradeSubmission({
      student_id: submission.student.id,
      course_id: submission.course_id,
      assignment_name: submission.assignment_name,
      submission_id: submission._id,
      marks: marks,
    });
    setMarks('');
  }

  return (
    <AccordionItem key={submission.name} className='w-full'>
      <AccordionItemHeading className='text-xl rounded-sm'>
        <AccordionItemButton className='rounded-sm'>
          <AccordionItemState>
            {({ expanded }) => (
              <>
                <div className={(expanded ? 'text-secondary bg-accent' : 'text-accent bg-tertiary hover:bg-opacity-80') + ' p-2 px-4 rounded-sm flex flex-row justify-between items-center'}>
                  <div className='flex flex-row text-inherit'>
                    <div className='text-inherit pr-8'>{submission.student.id}</div>
                    <div className='text-inherit'>{submission.student.name}</div>
                  </div>
                  <div className='flex flex-row items-center text-inherit'>
                    <div className='text-inherit'>{getDate(moment(submission.date))}</div>
                    <div className={(expanded ? (submission.marks ? 'text-accent_darker' : 'text-secondary') : (submission.marks ? 'text-accent' : 'text-secondary')) + ' text-5xl leading-3 ml-2'}>&#8226;</div>
                  </div>
                </div>
              </>
            )}
          </AccordionItemState>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className='px-4 py-2 rounded-sm bg-tertiary accordian-animation'>
        <div className='flex flex-col bg-opacity-30 bg-primary p-4'>
          {submission.answer}
        </div>
        <div className='flex flex-row mt-2 justify-between'>
          <div className='flex flex-col'>
            <div className='flex flex-row'>
              <div className='text-accent mr-1'>Marks:</div>
              <div className=''>{submission.marks ? submission.marks : 'not graded'}</div>
            </div>
            <div className='flex flex-row'>
              <div className='text-accent mr-1'>Total Marks:</div>
              <div className=''>{totalMarks}</div>
            </div>
          </div>
          <div className='flex flex-row items-center'>
            <input type="number" name="marks" onChange={handleOnChange} value={marks} className='bg-primary h-1/2 bg-opacity-75 px-1 mx-1 w-36 rounded-sm outline-none border border-primary focus:border-accent' />
            <button className={(marks ? 'bg-accent' : 'bg-accent_dark') + ' hover:bg-opacity-80 px-2 h-1/2 self-center rounded-sm'} onClick={handleGradeSubmission}>GRADE</button>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  )
}

export default SubmissionInstructor