import { Route, Navigate, Routes, Outlet } from "react-router-dom";
import { Fragment, React, useContext } from 'react'

import UserContext from '../../../context/UserContext/UserContext';
import CourseContext from "../../../context/CourseContext/CourseContext";
import AssignmentContext from "../../../context/AssignmentContext/AssignmentContext";

import Home from '../../Home/Home';
import Register from '../../Register/Register';
import RegisterInstructor from '../../Register/RegisterInstructor'
import RegisterStudent from '../../Register/RegisterStudent'
import Login from '../../Login/Login'
import LoginInstructor from '../../Login/LoginInstructor';
import LoginStudent from '../../Login/LoginStudent';

import MainInstructor from '../../Instructor/MainInstructor';
import DashBoardInstructor from '../../Instructor/Dashboard/DashBoardInstructor';
import ProfileInstructor from '../../Instructor/Dashboard/ProfileInstructor';
import CoursesInstructor from '../../Instructor/Dashboard/CoursesInstructor';
import CourseInstructor from '../../Instructor/Course/CourseInstructor';
import CourseDashBoardInstructor from '../../Instructor/Course/CourseDashBoardInstructor'
import CourseHomeInstructor from '../../Instructor/Course/CourseHomeInstructor';
import CourseAssignmentsInstructor from '../../Instructor/Course/CourseAssignmentsInstructor'
import SubmissionsInstructor from "../../Instructor/Course/Assignment/Submission/SubmissionsInstructor";
import SubmissionsHomeInsructor from "../../Instructor/Course/Assignment/Submission/SubmissionsHomeInsructor";
import SubmissionMainInstructor from "../../Instructor/Course/Assignment/Submission/SubmissionMainInstructor";

import MainStudent from '../../Student/MainStudent';
import DashBoardStudent from '../../Student/Dashboard/DashBoardStudent';
import ProfileStudent from '../../Student/Dashboard/ProfileStudent';
import CoursesStudent from '../../Student/Dashboard/CoursesStudent';
import CourseHome from '../../Student/Course/CourseHomeStudent';
import CourseDashBoardStudent from '../../Student/Course/CourseDashBoardStudent';
import CourseStudent from '../../Student/Course/CourseStudent';
import CourseAssignmentsStudent from '../../Student/Course/CourseAssignmentsStudent'
import CourseGradesStudent from '../../Student/Course/CourseGradesStudent'

const AppRoutes = () => {

  const { role } = useContext(UserContext);
  const { userCourses } = useContext(CourseContext);
  const { assignments } = useContext(AssignmentContext);

  return (

    /* General Routes */

    <Routes>
      <Route exact path="/" element={<Navigate replace to="/home" />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/login" element={<Login />}>
        <Route exact path="" element={<Navigate replace to="instructor" />} />
        <Route exact path="instructor" element={<LoginInstructor />} />
        <Route exact path="student" element={<LoginStudent />} />
      </Route>
      <Route exact path="/register" element={<Register />}>
        <Route exact path="" element={<Navigate replace to="instructor" />} />
        <Route exact path="instructor" element={<RegisterInstructor />} />
        <Route exact path="student" element={<RegisterStudent />} />
      </Route>

      {/* Instructor Routes  */}

      {role === 'instructor' &&
        <>
          <Route exact path="/instructor" element={<MainInstructor />}>
            <Route exact path="dashboard" element={<DashBoardInstructor />}>
              <Route exact path="" element={<Navigate replace to="profile" />} />
              <Route exact path="profile" element={<ProfileInstructor />} />
              <Route exact path="courses" element={<CoursesInstructor />} />
            </Route>

            <Route exact path="course/*" element={<CourseDashBoardInstructor />} >
              {userCourses.map((course, idx) => {
                return (
                  <Fragment key={course.id}>
                    <Route path={`${course.id}`} element={<CourseInstructor course_name={course.id} />}>
                      <Route exact path="" element={<Navigate replace to="home" />} />
                      <Route exact path="home" element={<CourseHomeInstructor course_name={course.id} />} />
                      <Route exact path="assignments" element={<CourseAssignmentsInstructor course_name={course.id} />} />
                      {/* <Route exact path="submissions" element={<CourseSubmissions course_name={course.id} />} /> */}
                    </Route>

                    <Route path={`${course.id}/*`} element={<Outlet course_name={course.id} />}>
                      <Route exact path="assignment/*" element={<SubmissionMainInstructor course_name={course.id} />}>
                        {assignments.map((assignment, idx) => {
                          return (
                            <Route exact path={assignment.name.replace(/\s+/g, '_').toLowerCase()} key={assignment.name} element={<SubmissionsInstructor course_name={course.id} assignment_name={assignment.name} />} >
                              <Route exact path="" element={<Navigate replace to="submissions" />} />
                              <Route exact path="submissions" element={<SubmissionsHomeInsructor course_name={course.id} assignment_name={assignment.name} />} />
                            </Route>
                          )
                        })}
                      </Route>
                    </Route>
                  </Fragment>
                )
              })}
            </Route>
          </Route>
        </>
      }

      {/* Student Routes */}

      {role === 'student' &&
        <>
          <Route exact path="/student" element={<MainStudent />}>
            <Route exact path="dashboard" element={<DashBoardStudent />}>
              <Route exact path="" element={<Navigate replace to="profile" />} />
              <Route exact path="profile" element={<ProfileStudent />} />
              <Route exact path="courses" element={<CoursesStudent />} />
            </Route>

            <Route exact path="course/*" element={<CourseDashBoardStudent />} >
              {userCourses.map((course, idx) => {
                return (
                  <Route key={course.id} exact path={`${course.id}`} element={<CourseStudent course_name={course.id} />}>
                    <Route exact path="" element={<Navigate replace to="home" />} />
                    <Route exact path="home" element={<CourseHome course_name={course.id} />} />
                    <Route exact path="assignments" element={<CourseAssignmentsStudent course_name={course.id} />} />
                    <Route exact path="grades" element={<CourseGradesStudent course_name={course.id} />} />
                  </Route>
                )
              })}
            </Route>
          </Route>
        </>
      }

    </Routes>
  )
}

export default AppRoutes