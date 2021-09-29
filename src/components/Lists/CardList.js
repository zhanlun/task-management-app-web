import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from './Card';
import { PlusIcon } from '@heroicons/react/outline'
import { NewCard } from './NewCard';

export const CardList = ({ cardList, index, cards }) => {
  const [newCardModalIsOpen, setNewCardModalIsOpen] = useState(false)

  return (
    <Draggable draggableId={cardList.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`
            px-1 pt-2 my-2 mx-auto sm:mx-1 w-11/12 sm:w-72 rounded flex flex-col
            gap-0
            ${snapshot.isDragging ?
              'bg-yellow-100 shadow' :
              'bg-gray-200'
            }
          `}
          {...provided.draggableProps} ref={provided.innerRef}>
          <h3
            className="font-bold text-gray-700 tracking-wide text-sm mt-1 ml-3"
            {...provided.dragHandleProps}>
            {cardList.title}
          </h3>
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
    cards.map((card, index) => (
      <Card key={card.id} card={card} index={index} />
    ))
  )
}