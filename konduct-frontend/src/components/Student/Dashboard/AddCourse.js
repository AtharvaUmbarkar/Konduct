import React, { useState, useContext } from 'react'

import CourseContext from '../../../context/CourseContext/CourseContext';

const AddCourse = (props) => {

  const { addCourse } = useContext(CourseContext);

  const [course, setCourse] = useState('');

  const changeAddCourse = (e) => {
    e.preventDefault();
    setCourse(e.target.value);
  }

  const submitAddCourse = (e) => {
    e.preventDefault();
    addCourse(course);
    setCourse('');
  }

  return (
    <form method="post" onSubmit={submitAddCourse} id='add-course-student' className='flex flex-row items-center h-8 text-sm space-x-1 my-3 mb-2'>
      <select title='course' name="course" value={course} onChange={changeAddCourse} className='bg-tertiary outline-none border border-accent rounded-sm shadow-none w-48 focus:border-secondary p-1 h-full'>
        <option value='' form='add-course-student'></option>
        {props.courses.map((course, idx) => {
          return (
            <option key={course.id} value={course.id} form='add-course-student' className=''>{course.id}</option>
          )
        })}
      </select>
      <button type="submit" className='bg-accent rounded-sm p-1.5 px-2 h-full w-32'>ADD COURSE</button>
    </form>
  )
}

export default AddCourse