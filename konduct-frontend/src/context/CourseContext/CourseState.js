/* eslint-disable no-unused-vars */
import { React, useState, useContext } from "react";
import { useAlert } from '@blaumaus/react-alert';
import CourseContext from "./CourseContext";
import UserContext from "../UserContext/UserContext";
const _ = require('lodash');

const CourseState = (props) => {

  //! May cause issues
  const { role } = useContext(UserContext)
  const alert = useAlert();
  const host = "http://localhost:5000";

  const [userCourses, setUserCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [courseData, setCourseData] = useState({});

  const fetchUserCourses = async () => {
    const response = await fetch(host + `/api/${role}/course/get`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setUserCourses(json);
  }

  const fetchAvailableCourses = async () => {
    const response = await fetch(host + `/api/${role}/course/get_available`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setAvailableCourses(json);
  }

  const addCourse = async (course) => {
    if (!course) return;
    const response = await fetch(host + `/api/${role}/course/add`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        id: course,
      }),
    });
    const json = await response.json();
    if (json.success) {
      setUserCourses((userCourses) => userCourses.concat(json.response));
      alert.show('Course Added Successfully', { type: 'success' });
    }
    else alert.show('Failed to Add Course', { type: 'error' });
  }

  const removeCourse = async (course) => {
    if (!course) return;
    const response = await fetch(host + `/api/${role}/course/remove`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        id: course,
      }),
    });
    const json = await response.json();
    if (json.success) {
      setUserCourses((userCourses) => userCourses.filter(course =>
        course.id !== json.response.id,
      ));
      setAvailableCourses((availableCourses) => availableCourses.concat(json.response))
      alert.show('Course Removed Successfully', { type: 'success' });
    }
    else alert.show('Failed to Remove Course', { type: 'success' });
  }

  const fetchCourseData = async (course) => {
    if (!course) return;
    const response = await fetch(host + `/api/${role}/course/get_course_data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        id: course,
      }),
    });
    const json = await response.json();
    setCourseData(json);
  }

  return (
    <CourseContext.Provider value={{
      //* Data
      userCourses,
      availableCourses,
      courseData,
      role,

      //* Functions
      fetchUserCourses,
      fetchAvailableCourses,
      addCourse,
      removeCourse,
      fetchCourseData,
    }}>
      {props.children}
    </CourseContext.Provider>
  )
}

export default CourseState;