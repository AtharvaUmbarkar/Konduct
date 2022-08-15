import { React, useContext, useState } from 'react'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import moment from 'moment';

import AssignmentContext from '../../../../context/AssignmentContext/AssignmentContext';

const EditAssignmentModal = (props) => {

  const { updateAssignment } = useContext(AssignmentContext);

  const [assignmentData, setAssignmentData] = useState({
    name: props.assignmentData.name,
    end_date: moment(props.assignmentData.end_date).format("yyyy-MM-DDTHH:mm"),
    total_marks: props.assignmentData.total_marks,
    instructions: props.assignmentData.instructions,
  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: '#393E46',
    border: '2px solid #393E46',
    boxShadow: 24,
    p: 4,
    borderRadius: "0.5rem",
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOnchange = (e) => {
    setAssignmentData({ ...assignmentData, [e.target.name]: e.target.value });
  }

  const handleUpdateAssignment = (e) => {
    e.preventDefault();
    if (!(assignmentData.end_date && assignmentData.instructions && assignmentData.total_marks)) {
      return;
    }
    const data = {
      name: props.assignmentData.name,
      course_id: props.assignmentData.course_id,
      instructions: assignmentData.instructions,
      start_date: moment().toDate(),
      end_date: moment(assignmentData.end_date).toDate(),
      total_marks: assignmentData.total_marks,
    }
    updateAssignment(data);
    handleClose();
  }

  const handleCancel = () => {
    setAssignmentData({
      end_date: moment(props.assignmentData.end_date).format("yyyy-MM-DDTHH:mm"),
      total_marks: props.assignmentData.total_marks,
      instructions: props.assignmentData.instructions,
    });
    handleClose();
  }

  return (
    <>
      <button className='text-accent text-center border border-accent bg-secondary rounded-sm p-1 px-8 h-full  my-4 bg-opacity-0 hover:bg-opacity-5' onClick={handleOpen}>EDIT</button>
      <Modal
        open={open}
        onClose={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backgroundColor: "#000000b3" }}
      >
        <Box sx={style}>
          <div className='flex flex-col items-center'>
            <form onSubmit={handleUpdateAssignment} id='edit-assignment' className='flex flex-col w-4/5 space-y-4'>
              <div className='flex flex-col w-full text-center text-3xl text-accent'>{props.assignmentData.name}</div>
              <div className='flex flex-col w-full'>
                <div className='text-accent text-lg'>Due On:</div>
                <input type={'datetime-local'} onChange={handleOnchange} value={assignmentData.end_date} name='end_date' className='bg-primary bg-opacity-75 p-1 rounded-sm outline-none border border-primary focus:border-accent'></input>
              </div>
              <div className='flex flex-col w-full'>
                <div className='text-accent text-lg'>Total Marks:</div>
                <input type={'number'} onChange={handleOnchange} value={assignmentData.total_marks} name='total_marks' className='bg-primary bg-opacity-75 p-1 rounded-sm outline-none border border-primary focus:border-accent'></input>
              </div>
              <div className='flex flex-col w-full'>
                <div className='text-accent text-lg'>Instructions:</div>
                <textarea onChange={handleOnchange} value={assignmentData.instructions} name='instructions' className='w-full min-h-[15rem] bg-primary bg-opacity-75 p-1 rounded-sm resize-y outline-none border border-primary focus:border-accent'></textarea>
              </div>
              <button type="submit" form='edit-assignment' className='bg-accent rounded-sm p-1.5 px-2 h-full w-48 self-center hover:bg-opacity-80'>MODIFY ASSIGNMENT</button>
              <button type="button" form='edit-assignment' className='bg-accent rounded-sm p-1.5 px-2 h-full w-48 self-center hover:bg-opacity-80' onClick={handleCancel}>CANCEL</button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default EditAssignmentModal