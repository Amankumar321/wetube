import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const NavPaneTile = ({name, link, icon, color, activePage}) => {
   const navigate = useNavigate();

   const navigateTo = () => {
     navigate(link);
  }
  

  return (
    <button className={"w-full flex h-10 p-2 rounded-lg " + (activePage === name ? "ring-2 ring-gray-400 bg-gray-200" : "")} onClick={navigateTo}>
        <div className={"text-lg w-1/8 pr-10 " + color}>
          <i className={icon}></i>
        </div>
        <div className="flex-1 text-left">
          {name}
        </div>
    </button>
  )
}

export default NavPaneTile