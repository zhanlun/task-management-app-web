import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CardList } from './CardList';
import initialData from './data';
import { useMediaQuery } from 'react-responsive';
import { NewCardList } from './NewCardList';

export const ListWrapper = ({ board }) => {
  const [data, setData] = useState(initialData)
  const [newListModalIsOpen, setNewListModalIsOpen] = useState(false)

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'cardList') {
      const newCardListOrder = Array.from(data.cardListOrder);
      newCardListOrder.splice(source.index, 1);
      newCardListOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        cardListOrder: newCardListOrder,
      };
      setData(newState);
      return;
    }

    const home = data.cardLists[source.droppableId];
    const foreign = data.cardLists[destination.droppableId];

    if (home === foreign) {
      const newCardIds = Array.from(home.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        cardIds: newCardIds,
      };

      const newState = {
        ...data,
        cardLists: {
          ...data.cardLists,
          [newHome.id]: newHome,
        },
      };

      setData(newState);
      return;
    }

    // moving from one list to another
    const homeCardIds = Array.from(home.cardIds);
    homeCardIds.splice(source.index, 1);
    const newHome = {
      ...home,
      cardIds: homeCardIds,
    };

    const foreignCardIds = Array.from(foreign.cardIds);
    foreignCardIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      cardIds: foreignCardIds,
    };

    const newState = {
      ...data,
      cardLists: {
        ...data.cardLists,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    setData(newState);
  };

  const isPhone = useMediaQuery({
    query: '(max-width: 640px)'
  })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="h-full flex flex-col sm:flex-row flex-nowrap sm:flex-wrap justify-start items-start gap-1">
      <Droppable
          droppableId="all-card-lists"
        direction={isPhone ? 'vertical' : 'horizontal'}
          type="cardList"
      >
        {provided => (
            <div
              className="sm:h-full flex flex-col sm:flex-row flex-wrap justify-start items-start gap-1"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
              {data.cardListOrder.map((cardListId, index) => {
                const cardList = data.cardLists[cardListId];
              return (
                <InnerList
                  key={cardList.id}
                  cardList={cardList}
                  cardMap={data.cards}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
        {/* stick at bottom */}
        <button
          onClick={() => setNewListModalIsOpen(true)}
          className={
            `
          py-3 px-2 my-2 mx-auto sm:mx-1 w-11/12 sm:w-72
          bg-white bg-opacity-20 hover:bg-opacity-30
          duration-200
          rounded flex flex-col
          select-none
          `
          }>
          <span className={
            `
            text-white text-sm ml-2
            `
          }>
            + Add a list
          </span>
        </button>
      </div>

      <NewCardList isOpen={newListModalIsOpen} setIsOpen={setNewListModalIsOpen} />
    </DragDropContext>
  )
}

const InnerList = ({ cardList, cardMap, index }) => {
  const cards = cardList.cardIds.map(cardId => cardMap[cardId]);
  return <CardList cardList={cardList} cards={cards} index={index} />;
}