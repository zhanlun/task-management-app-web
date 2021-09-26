import { Menu, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

export const Board = ({ board, updateBoard, deleteBoard }) => {
  const [zIndex, setZIndex] = useState('z-0')

  const handleMenu = (e) => {
    e.preventDefault();

    // TODO
    // use headless menu drop down for edit and delete

    // TODO switch to overlay

  }

  return (
    <div
      onContextMenu={handleMenu} className={zIndex + " relative bg-yellow-500 shadow-lg rounded-lg p-12 text-center hover:bg-opacity-80 duration-100"}>
      <p className="font-bold text-white tracking-wider">
        {board.name}
      </p>
      <button type="button" onClick={handleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-4 top-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
      <div className="absolute right-2 bottom-2"
        onMouseEnter={() => setZIndex('z-50')}
        onMouseLeave={() => setZIndex('z-0')}
      >
        <BoardDropDownMenu id={board.id} setZIndex={setZIndex} />
      </div>
    </div >
  )
}

const BoardDropDownMenu = ({ id, setZIndex }) => {
  return (
    <div className="w-56 text-right"
    >
      <Menu as="div" className="relative inline-block text-left"
      >
        <>
          <div>
            <Menu.Button
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Options
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Menu.Button>
          </div>
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >

                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </>
      </Menu>
    </div>
  )
}