import { React, useState } from 'react'
import AccordianItem from './AccordianItem'

const data = [
  {
    a: 'qweweqwe',
    b: '123123123',
  },
  {
    a: 'qweweqwe',
    b: '123123123',
  },
  {
    a: 'qweweqwe',
    b: '123123123',
  },
  {
    a: 'qweweqwe',
    b: '123123123',
  },
]

const Accordian = (props) => {

  const [activeItem, setActiveItem] = useState(-1);
  const switchActive = (index) => {
    activeItem === index ? setActiveItem(-1) : setActiveItem(index);
  }

  return (
    <div className='my-4 flex flex-col items-start w-4/5 space-y-2'>
      {data.map((item, index) => {
        return <AccordianItem key={index} item={item} switchActive={() => switchActive(index)} active={index === activeItem} />
      })}
    </div>
  )
}

export default Accordian