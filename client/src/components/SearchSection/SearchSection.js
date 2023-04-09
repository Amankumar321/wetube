import React from 'react'
import { useMediaQuery } from 'react-responsive';

const SearchSection = () => {

  const isMobile = useMediaQuery({ query: `(max-width: 639px)` })

  return (
    <div className="flex-1 flex h-full justify-center">
      {
        !isMobile ?
          <div className="w-3/4 lg:w-1/2 z-20 ring-2 ring-gray-400 bg-gray-200 h-8 self-center rounded-2xl flex">
            <div className="flex-1">
              <input className="w-full p-4 z-10 rounded-l-2xl h-full"></input>
            </div>
            <button className="px-6 rounded-r-2xl border-l-2 border-gray-400 h-full">
              <i className="fa-sharp fa-solid fa-magnifying-glass text-lg"></i>
            </button>
          </div>
        : null
      }
    </div>
  )
}

export default SearchSection