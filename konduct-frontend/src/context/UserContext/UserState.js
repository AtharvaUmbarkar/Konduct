/* eslint-disable no-unused-vars */
import React from "react";
import UserContext from "./UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@blaumaus/react-alert";
const _ = require('lodash');

const UserState = (props) => {

  const alert = useAlert();
  const host = "http://localhost:5000"

  const [role, setRole] = useState(localStorage.getItem('role') ? localStorage.getItem('role') : '');
  const [userProfile, setUserProfile] = useState({});

  const modifyRole = async (role) => {
    setRole(role);
  }

  const loginInstructor = async (userData) => {
    const response = await fetch(host + "/api/instructor/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roll_number: userData.roll_number,
        password: userData.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("name", json.name);
      localStorage.setItem("id", json.id);
      localStorage.setItem("role", 'instructor');
      await modifyRole('instructor');
      return true;
    }
    else {
      // console.log(json.errors);
      alert.show('Please Login with Correct Credentials', { type: 'error' });
      return false;
    }
  }

  const loginStudent = async (userData) => {
    const response = await fetch(host + "/api/student/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roll_number: userData.roll_number,
        password: userData.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("name", json.name);
      localStorage.setItem("id", json.id);
      localStorage.setItem("role", 'student');
      await modifyRole('student');
      return true;
    }
    else {
      // console.log(json.errors);
      alert.show('Please Login with Correct Credentials', { type: 'error' });
      return false;
    }
  }

  const registerInstructor = async (userData) => {
    const response = await fetch(host + "/api/instructor/auth/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        roll_number: userData.roll_number,
        department: userData.department,
        password: userData.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("name", json.name);
      localStorage.setItem("id", json.id);
      localStorage.setItem("role", 'instructor');
      await modifyRole('instructor');
      return true;
    }
    else {
      // console.log(json.errors);
      alert.show('This Instructor is Already Registered', { type: 'error' });
      return false;
    }
  }

  const registerStudent = async (userData) => {
    const response = await fetch(host + "/api/student/auth/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        roll_number: userData.roll_number,
        program: userData.program,
        department: userData.department,
        password: userData.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("name", json.name);
      localStorage.setItem("id", json.id);
      localStorage.setItem("role", 'student');
      await modifyRole('student');
      return true;
    }
    else {
      // console.log(json.errors);
      alert.show('This Student is Already Registered', { type: 'error' });
      return false;
    }
  }

  const fetchUserProfile = async () => {
    if (role === 'instructor') {
      const response = await fetch(host + "/api/instructor/auth/get", {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      });
      const json = (await response.json())[0];
      setUserProfile({
        name: json.name,
        roll_number: json.roll_number,
        email: json.email,
        department: json.department,
      })
    }
    else if (role === 'student') {
      const response = await fetch(host + "/api/student/auth/get", {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
      });
      const json = (await response.json())[0];
      setUserProfile({
        name: json.name,
        roll_number: json.roll_number,
        email: json.email,
        program: json.program,
        department: json.department,
      })
    }
  }



  return (
    <UserContext.Provider value={{
      //* Data
      role,
      userProfile,

      //* Functions
      loginInstructor,
      loginStudent,
      registerInstructor,
      registerStudent,
      modifyRole,
      fetchUserProfile,
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;