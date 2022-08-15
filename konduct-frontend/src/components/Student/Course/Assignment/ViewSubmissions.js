/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useContext } from 'react'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import moment from 'moment';
import AnswerTooltip from './AnswerTooltip';

import SubmissionContext from '../../../../context/SubmissionContext/SubmissionContext';

const ViewSubmissionsModal = (props) => {

  const { submissions, fetchSubmissions, deleteSubmission } = useContext(SubmissionContext);

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
  const handleOpen = async() => {
    setOpen(true);
    await fetchSubmissions({
      course_id: props.assignmentData.course_id,
      name: props.assignmentData.name,
    });
  };
  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    handleClose();
  }

  const handleDeleteSubmission = async (submission) => {
    await deleteSubmission(submission);
  }

  const getDate = (date) => {
    return date.format("DD/MM/YYYY HH:mm:ss")
  }

  return (
    <>
      <button className='text-accent text-center border border-accent bg-secondary rounded-sm p-1 px-4 h-full  my-4 bg-opacity-0 hover:bg-opacity-5' onClick={handleOpen}>VIEW SUBMISSIONS</button>
      <Modal
        open={open}
        onClose={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backgroundColor: "#000000b3" }}
      >
        <Box sx={style}>
          <div className='flex flex-col items-center'>
            <div className='flex flex-col w-11/12 space-y-4'>
              <div className='flex flex-col w-full text-center text-3xl text-accent'>{props.assignmentData.name}</div>
              <div className='flex flex-col w-full space-y-2'>
                {submissions.map((submission, index) => {
                  return (
                    <div key={index} className='flex flex-row justify-between w-full items-center rounded-sm p-2 bg-primary bg-opacity-50'>
                      <div className='flex flex-row justify-start items-center'>
                        <div className='text-4xl text-accent mr-1'>&#8226;</div>
                        <AnswerTooltip answer={submission.answer} />
                      </div>
                      <div className='flex flex-row justify-between'>
                        <div className='text-lg text-accent ml-2 mr-2'>{getDate(moment(submission.date)).split(' ')[0]}</div>
                        <div className='text-lg text-accent mr-4'>{getDate(moment(submission.date)).split(' ')[1]}</div>
                        <button className='bg-accent hover:bg-opacity-80 px-2 h-4/5 self-center rounded-sm' onClick={() => handleDeleteSubmission(submission)}>DELETE</button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <button type="button" className='bg-accent rounded-sm p-1.5 px-2 h-full w-48 self-center hover:bg-opacity-80' onClick={handleCancel}>CANCEL</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ViewSubmissionsModal