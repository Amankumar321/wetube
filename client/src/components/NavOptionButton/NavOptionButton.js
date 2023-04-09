import React from 'react'

const NavOptionButton = ({setNavPaneVisible}) => {
  
  const toggleNavigationPane = () => {
    setNavPaneVisible(value => !value)
  }

  return (
    <button onClick={toggleNavigationPane} className="px-4 mx-2 lg:hidden">
        <i className="fa-solid fa-bars text-lg"></i>
    </button>
  )
}

export default NavOptionButton