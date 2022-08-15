/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useContext, useEffect } from 'react'
import { AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, AccordionItemState, } from 'react-accessible-accordion';

import moment from 'moment';
import '../../../Custom/Accordian.css'

import AssignmentContext from '../../../../context/AssignmentContext/AssignmentContext';

const AddAssignment = (props) => {

  const { addAssignment } = useContext(AssignmentContext);
  const [canAddAssignment, setCanAddAssignment] = useState(false)
  const [assignmentData, setAssignmentData] = useState({
    name: '',
    end_date: '',
    total_marks: '',
    instructions: '',
  })

  const handleOnchange = (e) => {
    setAssignmentData({ ...assignmentData, [e.target.name]: e.target.value })
  }

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (!(assignmentData.name && assignmentData.end_date && assignmentData.instructions && assignmentData.total_marks)) {
      return;
    }
    const data = {
      name: assignmentData.name,
      course_id: props.course_name,
      instructions: assignmentData.instructions,
      start_date: moment().toDate(),
      end_date: moment(assignmentData.end_date).toDate(),
      total_marks: assignmentData.total_marks,
    }

    addAssignment(data);

    setAssignmentData({
      name: '',
      end_date: '',
      total_marks: '',
      instructions: '',
    });
  }

  useEffect(() => {
    if ((assignmentData.name && assignmentData.end_date && assignmentData.instructions && assignmentData.total_marks)) {
      setCanAddAssignment(true);
    }
    else setCanAddAssignment(false);
  }, [assignmentData])

  return (
    <AccordionItem key={'add-assignment'} className='w-full'>
      <AccordionItemHeading className='text-2xl rounded-sm'>
        <AccordionItemButton className='rounded-sm'>
          <AccordionItemState>
            {({ expanded }) => (
              <>
                <div className={(expanded ? 'text-secondary bg-accent' : 'text-accent bg-tertiary hover:bg-opacity-80') + ' p-2 rounded-sm flex flex-row items-center justify-center'}>
                  <div className={(expanded ? 'text-secondary' : ' text-secondary_dark') + ' w-full h-full text-center text-xl rounded-sm border-2 border-dashed border-accent p-1'}>CREATE ASSIGNMENT</div>
                </div>
              </>
            )}
          </AccordionItemState>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className='px-4 py-2 rounded-sm bg-tertiary accordian-animation'>
        <div className='flex flex-col items-center mt-2 mb-4'>
          <form onSubmit={handleAddAssignment} className='flex flex-col w-4/5 space-y-4'>
            <div className='flex flex-col w-full'>
              <div className='text-accent text-base'>Name:</div>
              <input type={'text'} onChange={handleOnchange} value={assignmentData.name} name='name' className='bg-primary bg-opacity-75 p-1 rounded-sm outline-none border border-primary focus:border-accent'></input>
            </div>
            <div className='flex flex-col w-full'>
              <div className='text-accent text-base'>Due On:</div>
              <input type={'datetime-local'} onChange={handleOnchange} value={assignmentData.end_date} name='end_date' className='bg-primary bg-opacity-75 p-1 rounded-sm outline-none border border-primary focus:border-accent'></input>
            </div>
            <div className='flex flex-col w-full'>
              <div className='text-accent text-base'>Total Marks:</div>
              <input type={'number'} onChange={handleOnchange} value={assignmentData.total_marks} name='total_marks' className='bg-primary bg-opacity-75 p-1 rounded-sm outline-none border border-primary focus:border-accent'></input>
            </div>
            <div className='flex flex-col w-full'>
              <div className='text-accent text-base'>Instructions:</div>
              <textarea onChange={handleOnchange} value={assignmentData.instructions} name='instructions' className='w-full bg-primary bg-opacity-75 p-1 rounded-sm resize-y outline-none border border-primary focus:border-accent'></textarea>
            </div>
            <button type="submit" className={(canAddAssignment ? 'bg-accent hover:bg-opacity-80' : 'bg-accent_dark') + ' rounded-sm p-1.5 px-2 h-full w-48 self-center'}>ADD ASSIGNMENT</button>
          </form>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  )
}

export default AddAssignment