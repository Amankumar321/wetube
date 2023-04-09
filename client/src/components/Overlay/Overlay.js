import React from 'react'

const Overlay = ({z}) => {
  return (
    <div className={"fixed top-0 left-0 h-full w-full opacity-80 bg-gray-200 " + z}>  
    </div>
  )
}

export default Overlay