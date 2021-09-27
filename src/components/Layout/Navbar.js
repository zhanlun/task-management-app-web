import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { NewBoard } from '../Boards/NewBoard'

export const Navbar = () => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full flex flex-wrap items-center justify-between px-2 py-3 mb-2 bg-gray-700 bg-opacity-50">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between md:justify-start">
        <Link to="/" className="text-sm font-bold leading-relaxed inline-block mr-4 md:mr-20 py-2 whitespace-nowrap uppercase text-white" href="#">
          Task Management App
        </Link>

        <button
          className="px-2 py-1 bg-gray-500 bg-opacity-50 rounded text-white font-semibold text-sm md:text-base hover:bg-opacity-70"
          onClick={() => setIsOpen(true)}
        >
          Create board
        </button>
      </div>

      <NewBoard isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  )
}
