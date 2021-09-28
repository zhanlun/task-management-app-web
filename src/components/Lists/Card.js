import React from 'react'
import { Draggable } from 'react-beautiful-dnd';

export const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
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
            `
          }
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {card.content}
        </div>
      )}
    </Draggable>
  )
}
