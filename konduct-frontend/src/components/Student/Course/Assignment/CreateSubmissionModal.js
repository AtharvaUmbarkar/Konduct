import { React, useState, useContext } from 'react'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import SubmissionContext from '../../../../context/SubmissionContext/SubmissionContext';

const CreateSubmissionModal = (props) => {

  const { addSubmission } = useContext(SubmissionContext);

  const [submissionData, setSubmissionData] = useState({
    answer: '',
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
  const handleOpen = () => {
    if (!props.canSubmit) return;
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const handleOnChange = (e) => {
    setSubmissionData({ ...submissionData, [e.target.name]: e.target.value });
  }

  const handleCreateSubmission = async (e) => {
    e.preventDefault();
    if (!(submissionData.answer)) {
      return;
    }
    const data = {
      assignment_name: props.assignmentData.name,
      course_id: props.assignmentData.course_id,
      answer: submissionData.answer,
    }
    await addSubmission(data)
    setSubmissionData({ answer: '' });
    handleClose();
  }

  const handleCancel = () => {
    setSubmissionData(submissionData);
    handleClose();
  }

  return (
    <>
      <button className={(props.canSubmit ? 'text-accent border-accent hover:bg-opacity-5' : 'text-accent_dark border-accent_dark') + ' text-center border bg-secondary rounded-sm p-1 px-4 h-full my-4 bg-opacity-0'} onClick={handleOpen}>CREATE SUBMISSION</button>
      <Modal
        open={open}
        onClose={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backgroundColor: "#000000b3" }}
      >
        <Box sx={style}>
          <div className='flex flex-col items-center'>
            <form onSubmit={handleCreateSubmission} id='edit-assignment' className='flex flex-col w-4/5 space-y-4'>
              <div className='flex flex-col w-full text-center text-3xl text-accent'>{props.assignmentData.name}</div>
              <div className='flex flex-col w-full'>
                <div className='text-accent text-lg'>Answer:</div>
                <textarea onChange={handleOnChange} value={submissionData.answer} name='answer' className='w-full min-h-[15rem] bg-primary bg-opacity-75 p-1 rounded-sm resize-y outline-none border border-primary focus:border-accent'></textarea>
              </div>
              <button type="submit" form='edit-assignment' className='bg-accent rounded-sm p-1.5 px-2 h-full w-48 self-center hover:bg-opacity-80'>CREATE SUBMISSION</button>
              <button type="button" form='edit-assignment' className='bg-accent rounded-sm p-1.5 px-2 h-full w-48 self-center hover:bg-opacity-80' onClick={handleCancel}>CANCEL</button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default CreateSubmissionModal