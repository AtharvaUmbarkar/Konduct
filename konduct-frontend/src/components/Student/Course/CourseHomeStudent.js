/* eslint-disable react-hooks/exhaustive-deps */
import { React, useContext } from 'react'

import CourseContext from '../../../context/CourseContext/CourseContext'

const CourseHomeStudent = (props) => {

  const { courseData } = useContext(CourseContext);

  return (
    <div className='flex flex-col grow items-center'>
      <div className='text-4xl m-8'>Home</div>
      <div className='w-4/5 flex flex-col items-start space-y-2 my-4'>
        <div className='text-lg flex flex-row w-full'>
          <span className='text-accent mr-1 w-1/4'>Course Name: </span>
          <span>{courseData.course ? courseData.course[0].name : ''}</span>
        </div>
        <div className='text-lg flex flex-row w-full'>
          <span className='text-accent mr-1 w-1/4'>Course Id: </span>
          <span>{courseData.course ? courseData.course[0].id : ''}</span>
        </div>
        <div className='text-lg flex flex-row w-full'>
          <span className='text-accent mr-1 w-1/4'>Instructor: </span>
          <span>{courseData.instructor ? courseData.instructor[0].name : ''}</span>
        </div>
        <div className='text-lg flex flex-row w-full'>
          <span className='text-accent mr-1 w-1/4'>Instructor Email: </span>
          <span>{courseData.instructor ? courseData.instructor[0].email : ''}</span>
        </div>
        <div className='text-lg flex flex-row w-full'>
          <span className='text-accent mr-1 w-1/4'>Students Enrolled: </span>
          <span>{courseData.course ? courseData.course[0].students_enrolled : ''}</span>
        </div>
      </div>
    </div>
  )
}

export default CourseHomeStudent