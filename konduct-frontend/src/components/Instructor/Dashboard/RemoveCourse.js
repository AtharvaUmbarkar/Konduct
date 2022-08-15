import React, { useState, useContext } from 'react'

import CourseContext from '../../../context/CourseContext/CourseContext';

const RemoveCourse = (props) => {

  const { removeCourse } = useContext(CourseContext);

  const [course, setCourse] = useState('');

  const changeRemoveCourse = (e) => {
    e.preventDefault();
    setCourse(e.target.value);
  }

  const submitRemoveCourse = (e) => {
    e.preventDefault();
    removeCourse(course);
    setCourse('');
  }

  return (
    <form method="post" onSubmit={submitRemoveCourse} id='remove-course-instructor' className='flex flex-row items-center h-8 text-sm space-x-1'>
      <select title='course' name="course" value={course} onChange={changeRemoveCourse} className='bg-tertiary outline-none border border-accent rounded-sm shadow-none w-48 focus:border-secondary p-1 h-full'>
        <option value='' form='remove-course-instructor'></option>
        {props.courses.map((course, idx) => {
          return (
            <option key={course.id} value={course.id} form='remove-course-instructor' className=''>{course.id}</option>
          )
        })}
      </select>
      <button type="submit" className='bg-accent rounded-sm p-1.5 px-2 h-full w-32'>REMOVE COURSE</button>
    </form>
  )
}

export default RemoveCourse