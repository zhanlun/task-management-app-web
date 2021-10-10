import React, { useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { PencilAltIcon } from '@heroicons/react/outline'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import { NewCard } from './NewCard';
import { DeleteCard } from './DeleteCard';

export const Card = ({ card, index }) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  const handleHover = (e) => {
    setShowMenu(true)
  }
  const handleHoverEnd = (e) => {
    setShowMenu(false)
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    menuRef.current.click()
  }

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          onMouseOver={handleHover}
          onMouseOut={handleHoverEnd}
          onContextMenu={handleRightClick}

          className={
            `
            p-2 mb-3
            text-sm text-gray-600 tracking-wide
            select-none
            rounded
            hover:bg-yellow-50
            ${snapshot.isDragging ?
              'bg-yellow-100 shadow-lg text-gray-800' :
              'bg-gray-50 shadow'
            }
            flex justify-between
            `
          }
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p className="flex-grow">
            {card.content}
          </p>
          <CardMenu menuRef={menuRef} card={card} showMenu={showMenu || snapshot.isDragging} />

          {/* <button className={`p-1 text-sm text-gray-500 hover:text-gray-600 bg-gray-300 bg-opacity-0 hover:bg-opacity-30 rounded-md focus:outline-none
          ${showMenu ? 'visible' : 'invisible'}`}>
            <PencilAltIcon className={`w-4 h-4 
            
          `} />
          </button> */}
        </div>
      )}
    </Draggable>
  )
}


const CardMenu = ({ card, menuRef, showMenu }) => {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  return (
    <div className="text-right "
    >
      <Menu as="div" className="relative inline-block text-left"
      >
        <Menu.Button
          ref={menuRef}
          className={`z-10 inline-flex justify-center w-full p-2 text-sm font-medium text-gray-500 hover:text-gray-600 bg-gray-300 bg-opacity-0 hover:bg-opacity-30 rounded-md focus:outline-none
          ${showMenu ? 'visible' : 'invisible'}
          `}>
          <PencilAltIcon className="w-4 h-4" />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items className="z-20 absolute right-0 w-56 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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

      <NewCard isOpen={editOpen} setIsOpen={setEditOpen} card={card} />
      <DeleteCard isOpen={deleteOpen} setIsOpen={setDeleteOpen} card={card} />
    </div>
  )
}