import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '../Layout/Button';
import { Card } from './Card';

export const CardList = ({ column, index, cards }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <div
          className={`
            px-1 pt-2 my-2 mx-auto sm:mx-1 w-11/12 sm:w-72 bg-gray-200 rounded flex flex-col
            gap-0
          `}
          {...provided.draggableProps} ref={provided.innerRef}>
          <h3
            className="font-bold text-gray-700 tracking-wide text-sm mt-1 ml-3"
            {...provided.dragHandleProps}>
            {column.title}
          </h3>
          <Droppable droppableId={column.id} type="card">
            {(provided, snapshot) => (
              <div
                className={`
                  px-1 pt-1 mt-1
                `}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList cards={cards} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* stick at bottom */}
          <div className="px-1">
            <Button className="bg-gray-500 w-full mx-auto">
              + Add new card
            </Button>
          </div>
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