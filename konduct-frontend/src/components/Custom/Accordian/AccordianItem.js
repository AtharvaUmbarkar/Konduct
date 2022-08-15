import React from 'react'

const AccordianItem = (props) => {
  return (
    <div className='w-full'>
      <button className={(props.active ? 'text-secondary bg-accent border-y border-y-accent' : 'text-accent bg-tertiary border-y border-y-accent_dark hover:bg-opacity-80') + ' p-2 px-4 rounded-sm w-full text-2xl text-left'} onClick={props.switchActive}>
        {props.item.a}
      </button>
      <div className={(props.active ? 'flex' : 'hidden') + '  px-4 py-2 rounded-sm bg-tertiary'}>
        {props.item.b}
      </div>
    </div>
  )
}

export default AccordianItem