/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useAlert } from '@blaumaus/react-alert';
import AssignmentContext from "./AssignmentContext";
import UserContext from "../UserContext/UserContext";
const _ = require('lodash');

const AssignmentState = (props) => {

  const alert = useAlert();
  const host = "http://localhost:5000";

  const { role } = useContext(UserContext)
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async (course) => {
    if (_.isEmpty(course)) return;
    const response = await fetch(host + `/api/${role}/course/assignment/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        id: course,
      }),
    });
    const json = (await response.json());
    setAssignments(json);
  }

  const addAssignment = async (assignment) => {
    if (_.isEmpty(assignment)) return;
    const response = await fetch(host + "/api/instructor/course/assignment/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(assignment),
    });
    const json = (await response.json());
    if (json.success) {
      setAssignments((assignments) => assignments.concat(json.new_assignment));
      alert.show('Assignment Added Successfully', { type: 'success' });
    }
    else alert.show('Failed to Add Assignment', { type: 'error' });
  }

  const deleteAssignment = async (assignment) => {
    if (_.isEmpty(assignment)) return;
    const confirmation = window.confirm("Are you sure you want to delete this assignment? This action cannot be reverted.");
    if (confirmation) {
      const response = await fetch(host + "/api/instructor/course/assignment/delete", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(assignment),
      });
      const json = (await response.json());
      if (json.success) {
        setAssignments((assignments) => assignments.filter((assignment) => {
          return json.deleted_assignment.name !== assignment.name;
        }));
        alert.show('Deleted Assignment Successfully', { type: 'success' });
      }
      else alert.show('Failed to Delete Assignment', { type: 'error' });
    }
  }

  const updateAssignment = async (assignment) => {
    if (_.isEmpty(assignment)) return;
    const confirmation = window.confirm("Are you sure you want to update this assignment? This action cannot be reverted.");
    if (confirmation) {
      const response = await fetch(host + "/api/instructor/course/assignment/update", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(assignment),
      });
      const json = (await response.json());
      console.log(json.updated_assignment);
      if (json.success) {
        const newAssignments = _.cloneDeep(assignments);
        newAssignments.forEach((assignment, index) => {
          if (assignment.name === json.updated_assignment.name) {
            newAssignments[index].instructions = json.updated_assignment.instructions;
            newAssignments[index].end_date = json.updated_assignment.end_date;
            newAssignments[index].total_marks = json.updated_assignment.total_marks;
          }
        });
        setAssignments(newAssignments);
        alert.show('Edited Assignment Successfully', { type: 'success' });
      }
      else alert.show('Failed to Edit Assignment', { type: 'error' });
    }

  }

  return (
    <AssignmentContext.Provider value={{
      //* Data
      assignments,

      //* Functions
      fetchAssignments,
      addAssignment,
      deleteAssignment,
      updateAssignment,
    }}>
      {props.children}
    </AssignmentContext.Provider>
  )
}

export default AssignmentState;