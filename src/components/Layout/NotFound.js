import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="bg-gray-50 rounded-md max-w-xs sm:max-w-xl px-1 py-12 text-center mx-auto my-36">
      <h2 className="text-black text-xl text-center font-extrabold tracking-wide my-3 mx-auto">Page not found</h2>
      <Link to="/"
        data-cy="back-home-page-link"
        className="py-2 px-2 text-center font-bold bg-gray-300 rounded bg-opacity-0 hover:bg-opacity-50 text-indigo-500 hover:text-indigo-600 duration-200">
        Click to return to home page
      </Link>
    </div>
  )
}
