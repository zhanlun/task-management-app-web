import { Menu, Transition } from '@headlessui/react'
import React, { useState, useRef } from 'react'
import { DotsHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { DeleteBoard } from './DeleteBoard'
import { NewBoard } from './NewBoard'
import { useHistory } from 'react-router'

export const Board = ({ board }) => {
  const menuRef = useRef(null)
  const history = useHistory()

  const handleRightClick = (e) => {
    e.preventDefault()
    menuRef.current.click()
  }

  const handleRedirect = (e) => {
    e.preventDefault()
    if (e.target.tagName !== 'BUTTON') {
      history.push(`/boards/${board.id}`)
    }
  }

  return (
    <div
      onClick={handleRedirect}
      onContextMenu={handleRightClick}
      className={"bg-yellow-500 shadow-lg rounded-lg pt-6  pr-0 pb-0 text-center hover:bg-opacity-80 duration-100 select-none"}>
      <p className="font-bold text-white tracking-wider py-6">
        {board.name}
      </p>

      <BoardDropDownMenu menuRef={menuRef} board={board} />
    </div >
  )
}

const BoardDropDownMenu = ({ board, menuRef }) => {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  return (
    <div className="w-full text-right "
    >
      <Menu as="div" className="relative inline-block text-left"
      >
        <Menu.Button
          ref={menuRef}
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-200 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <DotsHorizontalIcon className="w-6 h-6" />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="absolute right-0 w-56 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setEditOpen(true)
                    }}
                    className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                      } flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <PencilIcon className="w-6 h-6 mr-2" />
                    Edit
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setDeleteOpen(true)
                    }}
                    className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                      } flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <TrashIcon className="w-6 h-6 mr-2" />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <NewBoard isOpen={editOpen} setIsOpen={setEditOpen} board={board} />
      <DeleteBoard isOpen={deleteOpen} setIsOpen={setDeleteOpen} board={board} />
    </div>
  )
}