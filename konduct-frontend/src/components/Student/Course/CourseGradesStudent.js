/* eslint-disable react-hooks/exhaustive-deps */
import { React, useContext, useEffect } from 'react'

import SubmissionContext from '../../../context/SubmissionContext/SubmissionContext'

const CourseHomeStudent = (props) => {

  const { grades, getGrades } = useContext(SubmissionContext);

  useEffect(() => {
    getGrades(props.course_name)
  }, [])


  return (
    <div className='flex flex-col grow items-center'>
      <div className='text-4xl m-8'>Grades</div>
      <div className='w-4/5 flex flex-col items-start space-y-2 my-4'>
        <table className="table-auto bg-tertiary rounded-sm shadow-xl w-full">
          <thead>
            <tr className='bg-primary bg-opacity-50'>
              <th className='p-2 text-accent'></th>
              <th className='p-2 text-accent'>Assessment</th>
              <th className='p-2 text-accent'>Total Marks</th>
              <th className='p-2 text-accent'>Marks Obtained</th>
            </tr>
          </thead>
          <tbody className=''>
            {grades.map((assessment, index) => {
              return (
                <tr key={assessment.name}>
                  <td className='text-center my-1 p-2 text-accent'>{index + 1}</td>
                  <td className='text-center my-1 p-2'>{assessment.name}</td>
                  <td className='text-center my-1 p-2'>{assessment.total_marks}</td>
                  <td className='text-center my-1 p-2'>{assessment.marks}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseHomeStudent