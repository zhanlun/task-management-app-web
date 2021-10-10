import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from './Card';
import { PlusIcon } from '@heroicons/react/outline'
import { NewCard } from './NewCard';
import { Menu, Transition } from '@headlessui/react'
import { DotsHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { NewCardList } from './NewCardList';
import { DeleteCardList } from './DeleteCardList';

export const CardList = ({ cardList, index, cards }) => {
  const [newCardModalIsOpen, setNewCardModalIsOpen] = useState(false)

  return (
    <Draggable draggableId={cardList.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`
          px-1 pt-2 my-2 mx-auto sm:ml-0 sm:mr-2 w-11/12 sm:w-72 rounded flex flex-col
          gap-0
            ${snapshot.isDragging ?
              'bg-yellow-100 shadow' :
              'bg-gray-200'
            }
          `}
          {...provided.draggableProps} ref={provided.innerRef}>
          <div
            className="flex justify-between z-10">
            <h3
              className="flex-grow font-bold text-gray-700 tracking-wide text-sm mt-1 ml-3"
              {...provided.dragHandleProps}>
              {cardList.title}
            </h3>
            <CardListMenu cardList={cardList} />
          </div>
          <div className="z-0">
            <Droppable droppableId={cardList.id} type="card">
              {(provided) => (
                <div
                  className={`
                px-1 pt-1 mt-1
                `}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <InnerList cards={cards} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          {/* stick at bottom */}
          <div className="px-1 pb-1">
            <button
              onClick={() => setNewCardModalIsOpen(true)}
              className={
                `
          py-1 px-2 mb-2 mx-auto w-full
          hover:bg-gray-300
          text-gray-600 
          hover:text-gray-800
          duration-200
          rounded flex flex-col
          select-none
          `
              }>
              <span className={
                `
            text-sm ml-2
              flex flex-row gap-1 items-center
            `
              }>
                <PlusIcon className="w-4 h-4" />
                <p>
                  Add a card
                </p>
              </span>
            </button>
          </div>
          <NewCard cardList={cardList} isOpen={newCardModalIsOpen} setIsOpen={setNewCardModalIsOpen} />
        </div>
      )}
    </Draggable>
  );
}

const InnerList = ({ cards }) => {
  return (
    cards.map((card, index) => {
      return (
        <Card key={card.id} card={card} index={index} />
      )
    })
  )
}

const CardListMenu = ({ cardList }) => {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  return (
    <div className="text-right "
    >
      <Menu as="div" className="relative inline-block text-left"
      >
        <Menu.Button
          className="inline-flex justify-center w-full p-2 text-sm font-medium text-gray-500 hover:text-gray-600 bg-gray-300 bg-opacity-0 hover:bg-opacity-80 rounded-md focus:outline-none">
          <DotsHorizontalIcon className="w-4 h-4" />
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
                    Edit list title
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
                    Delete this list
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <NewCardList isOpen={editOpen} setIsOpen={setEditOpen} cardList={cardList} />
      <DeleteCardList isOpen={deleteOpen} setIsOpen={setDeleteOpen} cardList={cardList} />
    </div>
  )
}