/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react'

import moment from 'moment';

const Timer = (props) => {

  const [timer, setTimer] = useState('')

  const startTimer = () => {
    setInterval(() => {
      setTimer(getRemainingTime(moment(), moment(props.end_date)));
    }, 1000)
  }

  useEffect(() => {
    startTimer();
  }, [])

  const getRemainingTime = (start, end) => {
    const ms = moment(end, "DD/MM/YYYY HH:mm:ss").diff(moment(start, "DD/MM/YYYY HH:mm:ss"));
    const d = moment.duration(ms);
    const s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    if (ms <= 0) props.setCanSubmit(false);
    else props.setCanSubmit(true);
    return ms > 0 ? s : '00:00:00';
  }

  return (
    <div className='text-2xl text-accent'>{timer}</div>
  )
}

export default Timer