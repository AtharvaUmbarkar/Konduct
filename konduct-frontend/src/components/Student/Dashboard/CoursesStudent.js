import { React, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import AddCourse from './AddCourse'
import RemoveCourse from './RemoveCourse'

import CourseContext from '../../../context/CourseContext/CourseContext';

const CoursesStudent = () => {

  const { userCourses, availableCourses } = useContext(CourseContext);

  return (
    <div className='grow flex flex-col justify-start items-center'>
      <div className='text-4xl m-8'>Courses</div>
      <div className='w-4/5 flex flex-col items-center'>
        <AddCourse courses={availableCourses} />
        <RemoveCourse courses={userCourses} />
      </div>
      <div className='w-4/5 grid grid-cols-3 gap-2 m-4 mt-8'>
        {userCourses.map((course, index) => (
          <NavLink to={`/student/course/${course.id}`} key={course.id} className='text-xl h-20 w-full bg-tertiary text-accent hover:text-secondary hover:bg-opacity-70 grid place-items-center rounded-sm'>
            <div className='text-inherit'>{course.id}</div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default CoursesStudent