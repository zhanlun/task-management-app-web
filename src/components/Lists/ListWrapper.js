import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CardList } from './CardList';
import { useMediaQuery } from 'react-responsive';
import { NewCardList } from './NewCardList';
import { useDispatch, useSelector } from 'react-redux';
import { updateCardListIdOrder } from '../../actions/boards';
import { updateCardIdOrder } from '../../actions/cardLists';

export const ListWrapper = ({ board }) => {
  const dispatch = useDispatch()
  const [newListModalIsOpen, setNewListModalIsOpen] = useState(false)
  const boardState = useSelector(state => state.boards.find(b => b.id === board.id))
  const cardLists = useSelector(state => state.cardLists)
  const cards = useSelector(state => state.cards)
  const cardListOrder = boardState.card_list_ids_order

  const onDragEnd = ({ destination, source, draggableId, type }) => {
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
      const newCardListOrder = [...cardListOrder];
      newCardListOrder.splice(source.index, 1);
      newCardListOrder.splice(destination.index, 0, draggableId);

      dispatch(updateCardListIdOrder(board, newCardListOrder))
      return;
    }

    const home = cardLists[source.droppableId];
    const foreign = cardLists[destination.droppableId];

    if (home === foreign) {
      const newCardIds = [...home.card_ids_order]
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      dispatch(updateCardIdOrder(home, newCardIds))
      return;
    }

    // moving from one list to another
    const homeCardIds = [...home.card_ids_order]
    homeCardIds.splice(source.index, 1);
    dispatch(updateCardIdOrder(home, homeCardIds))

    const foreignCardIds = [...foreign.card_ids_order]
    foreignCardIds.splice(destination.index, 0, draggableId);
    dispatch(updateCardIdOrder(foreign, foreignCardIds))
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
              {cardListOrder.map((cardListId, index) => {
                const cardList = cardLists[cardListId];
              return (
                <InnerList
                  key={cardList.id}
                  cardList={cardList}
                  cardMap={cards}
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
  const cards = cardList.card_ids_order.map(cardId => cardMap[cardId]);
  return <CardList cardList={cardList} cards={cards} index={index} />;
}