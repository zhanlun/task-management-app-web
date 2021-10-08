import React from 'react';
import { CardReadonly } from './CardReadonly';

export const CardListReadonly = ({ cardList, index, cards }) => {
  return (
    <div
      className={`
      px-1 pt-2 my-2 mx-auto sm:ml-0 sm:mr-2 w-11/12 sm:w-72 rounded flex flex-col
      gap-0 bg-gray-200
      `}
    >
      <div
        className="flex justify-between pb-2">
        <h3
          className="flex-grow font-bold text-gray-700 tracking-wide text-sm mt-1 ml-3"
        >
          {cardList.title}
        </h3>
      </div>
      <div>
        <div
          className={`
        px-1 pt-1 mt-1
        `}
        >
          <InnerListReadonly cards={cards} />
        </div>
      </div>
    </div>
  );
}

const InnerListReadonly = ({ cards }) => {
  return (
    cards.map((card, index) => {
      return (
        <CardReadonly key={card.id} card={card} index={index} />
      )
    })
  )
}