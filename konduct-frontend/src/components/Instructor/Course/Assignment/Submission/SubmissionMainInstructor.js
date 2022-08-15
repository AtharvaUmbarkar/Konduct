/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useContext } from 'react'
import { Outlet, useNavigate } from "react-router-dom";

import AssignmentContext from '../../../../../context/AssignmentContext/AssignmentContext';

const SubmissionMainInstructor = (props) => {

  const navigate = useNavigate();
  const { fetchAssignments } = useContext(AssignmentContext);

  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('role') === 'student') {
      navigate('/home');
    }

    if (localStorage.getItem('token')) {
      fetchAssignments(props.course_name);
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  )
}

export default SubmissionMainInstructor