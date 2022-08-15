/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useAlert } from '@blaumaus/react-alert';
import SubmissionContext from "./SubmissionContext";
import UserContext from "../UserContext/UserContext";
const _ = require('lodash');

const SubmissionState = (props) => {

  const alert = useAlert();
  const host = "http://localhost:5000";

  const { role } = useContext(UserContext)
  const [submissions, setSubmissions] = useState([]);
  const [grades, setGrades] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0)

  const fetchSubmissions = async (assignment) => {
    if (_.isEmpty(assignment)) return;
    const response = await fetch(host + `/api/${role}/course/assignment/submission/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        course_id: assignment.course_id,
        assignment_name: assignment.name,
      }),
    });
    const json = (await response.json());
    setSubmissions(json.submissions.reverse());
    setTotalMarks(json.total_marks);
  }

  const addSubmission = async (submission) => {
    if (_.isEmpty(submission)) return;
    const response = await fetch(host + "/api/student/course/assignment/submission/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(submission),
    });
    const json = (await response.json());
    if (json.success) {
      setSubmissions((submissions) => [json.new_submission].concat(submissions));
      alert.show('Added Submission Successfully', { type: 'success' });
    }
    else alert.show('Failed to Add Submission', { type: 'error' });
  }

  const deleteSubmission = async (submission) => {
    if (_.isEmpty(submission)) return;
    const confirmation = window.confirm("Are you sure you want to delete this submission? This action cannot be reverted.");
    if (confirmation) {
      const response = await fetch(host + "/api/student/course/assignment/submission/delete", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(submission),
      });
      const json = (await response.json());
      if (json.success) {
        setSubmissions((submissions) => submissions.filter((submission) => {
          return json.deleted_submission._id !== submission._id;
        }));
        alert.show('Deleted Submission Successfully', { type: 'success' });
      }
      else alert.show('Failed to Delete Submission', { type: 'error' });
    }
  }

  const gradeSubmission = async (graded_submission) => {
    if (_.isEmpty(graded_submission)) return;
    const response = await fetch(host + "/api/instructor/course/assignment/submission/grade", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(graded_submission),
    });
    const json = (await response.json());
    const new_submissions = _.cloneDeep(submissions)
    new_submissions.forEach((submission, index) => {
      if (json._id === submission._id) {
        new_submissions[index].marks = json.marks;
      }
    });
    setSubmissions(new_submissions)
  }

  const getGrades = async (course_id) => {
    if (_.isEmpty(course_id)) return;
    const response = await fetch(host + `/api/student/course/assignment/submission/get_grades`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        course_id: course_id,
      }),
    });
    const json = await response.json();
    setGrades(json);
  }


  return (
    <SubmissionContext.Provider value={{
      //* Data
      submissions,
      totalMarks,
      grades,

      //* Functions
      fetchSubmissions,
      addSubmission,
      deleteSubmission,
      gradeSubmission,
      getGrades,
    }}>
      {props.children}
    </SubmissionContext.Provider>
  )
}

export default SubmissionState;