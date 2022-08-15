import './App.css';
import { BrowserRouter } from "react-router-dom";
import { React } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { transitions, positions, Provider as AlertProvider } from '@blaumaus/react-alert'

import UserState from '../../context/UserContext/UserState';
import CourseState from '../../context/CourseContext/CourseState';
import AssignmentState from '../../context/AssignmentContext/AssignmentState';
import SubmissionState from '../../context/SubmissionContext/SubmissionState';

import AppRoutes from './Routes/AppRoutes';

const theme = createTheme({
  palette: {
    primary: {
      main: "#222831",
    },
    secondary: {
      main: "#EEEEEE",
    },
    tertiary: {
      main: "#393E46",
    },
    accent: {
      main: "#00ADB5",
    },
    compliment: {
      main: "#B50800",
    },
    action: {
      disabledBackground: '#008187',
      disabled: '#393E46'
    }
  },
});

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 4000,
  offset: '10px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style} className='bg-primary_dark p-2 flex flex-row space-x-2'>
    <div></div>
    <div className={(options.type === 'success' ? 'text-green-500' : 'text-red-500') + ' text-base'}>{message}</div>
    <button onClick={close} className=''>&#x2716;</button>
  </div>
)

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AlertProvider template={AlertTemplate} {...options}>
          <UserState>
            <CourseState>
              <AssignmentState>
                <SubmissionState>
                  <BrowserRouter>
                    <AppRoutes />
                  </BrowserRouter>
                </SubmissionState>
              </AssignmentState>
            </CourseState>
          </UserState>
        </AlertProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
