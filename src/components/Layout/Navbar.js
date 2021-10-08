import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogout } from '../../reducers/user'
import { NewBoard } from '../Boards/NewBoard'
import { LogoutIcon } from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'

export const Navbar = () => {
  let [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)

  return (
    <nav className="w-full flex flex-wrap items-center justify-between px-2 py-3 mb-2 bg-gray-700 bg-opacity-50">
      <div className="container px-4 mx-auto flex flex-nowrap items-center justify-between">
        <div className="flex flex-wrap">
          <Link to="/" className="text-sm w-full sm:w-auto font-bold leading-relaxed inline-block mr-4 md:mr-20 py-2 whitespace-nowrap uppercase text-white" href="#">
            Task Management App
          </Link>
          {
            user.accessToken &&
            <button
              className="px-2 py-1 mb-4 md:mb-0 bg-gray-500 bg-opacity-50 rounded text-white font-semibold text-sm md:text-base hover:bg-opacity-70"
              onClick={() => setIsOpen(true)}
            >
              Create board
            </button>
          }
        </div>
        {
          user.accessToken &&
          <button
            className="px-2 py-1 flex mt-6 sm:mt-0 bg-pink-500 bg-opacity-50 rounded text-white font-semibold text-sm md:text-base hover:bg-opacity-70"
            onClick={() => {
              dispatch(userLogout())
              history.push('/')
            }
            }
          >
            <LogoutIcon className="w-4 h-4 sm:w-6 sm:h-6" />
            Logout
          </button>
        }
      </div>

      <NewBoard isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  )
}
