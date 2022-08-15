/* eslint-disable react-hooks/exhaustive-deps */
import { React, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, AccordionItemState, } from 'react-accessible-accordion';

import moment from 'moment';
import '../../../Custom/Accordian.css'

import AssignmentContext from '../../../../context/AssignmentContext/AssignmentContext';
import EditAssignmentModal from './EditAssignmentModal';
import Timer from './Timer';

const AssignmentInstructor = (props) => {

  const assignment = props.assignment;
  const { deleteAssignment } = useContext(AssignmentContext);

  const handleDeleteAssignment = async (name, course_id) => {
    const data = {
      name: name,
      course_id: course_id,
    }
    deleteAssignment(data);
  }

  const getDate = (date) => {
    return date.format("DD/MM/YYYY HH:mm:ss")
  }

  return (
    <AccordionItem key={assignment.name} className='w-full'>
      <AccordionItemHeading className='text-2xl rounded-sm'>
        <AccordionItemButton className='rounded-sm'>
          <AccordionItemState>
            {({ expanded }) => (
              <>
                <div className={(expanded ? 'text-secondary bg-accent' : 'text-accent bg-tertiary hover:bg-opacity-80') + ' p-2 px-4 rounded-sm'}>{assignment.name}</div>
              </>
            )}
          </AccordionItemState>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className='px-4 py-2 rounded-sm bg-tertiary accordian-animation'>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
              <div className='flex flex-row text-base'><span className='text-accent mr-1'>Published: </span><span className='text-secondary_dark'>{getDate(moment(assignment.start_date))}</span></div>
              <div className='flex flex-row text-base'><span className='text-accent mr-1'>Due: </span><span className='text-secondary_dark'>{getDate(moment(assignment.end_date))}</span></div>
            </div>
            <Timer end_date={assignment.end_date}/>
          </div>
          <div className='mt-2 text-secondary_dark bg-opacity-30 bg-primary p-4'>
            {assignment.instructions}
          </div>
          <div className='flex mt-2'>
            <div className='text-accent mr-1'>Total Marks:</div>
            <div className='text-secondary_dark'>{assignment.total_marks}</div>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <NavLink to={`/instructor/course/${assignment.course_id}/assignment/`+assignment.name.replace(/\s+/g, '_').toLowerCase()} className='text-accent border border-accent bg-secondary text-center p-1 px-4 rounded-sm my-4 bg-opacity-0 hover:bg-opacity-5'>VIEW SUBMISSIONS</NavLink>
            <div className='flex space-x-1'>
              <EditAssignmentModal assignmentData={assignment} />
              <button className='text-accent text-center border border-accent bg-secondary rounded-sm p-1 px-8 h-full  my-4 bg-opacity-0 hover:bg-opacity-5' onClick={() => handleDeleteAssignment(assignment.name, assignment.course_id)}>DELETE</button>
            </div>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  )
}

export default AssignmentInstructor