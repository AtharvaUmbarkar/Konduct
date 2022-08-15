import { React, useState } from 'react'

import './AnswerTooltip.css'

const AnswerTooltip = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpenTooltip = () => {
    setOpen(true)
  }
  const handleCloseTooltip = () => {
    setOpen(false)
  }
  return (
    <div className='flex flex-col relative'>
      <div className='text-ellipsis text-lg overflow-hidden whitespace-nowrap w-64 cursor-pointer' onMouseOver={handleOpenTooltip} onMouseOut={handleCloseTooltip}>{props.answer}</div>
      <div className={(open ? 'block answer-tooltip-animation' : 'hidden') + ' absolute top-full bg-primary z-10 w-[20rem] p-2 rounded-sm text-base'}>{props.answer}</div>
    </div>
  )
}

export default AnswerTooltip