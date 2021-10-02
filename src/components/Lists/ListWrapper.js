import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CardList } from './CardList';
import { useMediaQuery } from 'react-responsive';
import { NewCardList } from './NewCardList';
import { useDispatch, useSelector } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll'
import boardsApi from '../../api/boards';
import { boardUpdated } from '../../reducers/boards';
import { cardListCreated, cardListDeleted, cardListUpdated } from '../../reducers/cardLists';
import cardListsApi from '../../api/cardLists';
import cardsApi from '../../api/cards';
import { cardCreated, cardUpdated } from '../../reducers/cards';
import { io } from 'socket.io-client'
import { rootApiUrl } from '../../api';
const socket = io(rootApiUrl)

export const ListWrapper = ({ board }) => {
  const dispatch = useDispatch()
  const [newListModalIsOpen, setNewListModalIsOpen] = useState(false)
  const [horizontalScrollable, setHorizontalScrollable] = useState(true)
  const boardState = useSelector(state => state.boards.find(b => b.id === board.id))
  const cardLists = useSelector(state => state.cardLists)
  const cards = useSelector(state => state.cards)
  const cardListOrder = boardState.card_list_ids_order

  useEffect(() => {
    socket.emit('enter-board', board.id)

    socket.on('board:update', b => {
      if (b.last_update_date !== board.last_update_date) {
        dispatch(boardUpdated(b))
      }
    })

    socket.on('card_list:update', cl => {
      dispatch(cardListUpdated(cl))
    })

    socket.on('card:update', c => {
      dispatch(cardUpdated(c))
    })

    socket.on('card_list:create', (cl) => {
      const createdCardList = cardLists[cl.id]
      if (!createdCardList) {
        dispatch(cardListCreated(cl))
        boardsApi.getBoardById(board.id)
          .then(({ data }) => {
            dispatch(boardUpdated(data))
          }).catch(error => {
            console.log(error)
          })
      }
    })

    socket.on('card_list:delete', (id) => {
      const deletedCardList = cardLists[id]
      if (deletedCardList) {
        dispatch(cardListDeleted(id))
      }
    })

    socket.on('card:create', (c) => {
      const createdCard = cards[c.id]
      if (!createdCard) {
        dispatch(cardCreated(c))
        cardListsApi.getCardListById(c.card_list_id)
          .then(({ data }) => {
            dispatch(cardListUpdated(data))
          }).catch(error => {
            console.log(error)
          })
      }
    })

    return () => {
      socket.off('board:update')
      socket.off('card_list:update')
      socket.off('card_list:create')
      socket.off('card_list:delete')
      socket.off('card:update')
      socket.off('card:create')
      socket.off('card:delete')
      socket.emit('leave-board', board.id)
    }
    // eslint-disable-next-line
  }, [board.id])

  const onDragEnd = ({ destination, source, draggableId, type }) => {
    setHorizontalScrollable(true)

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

      const updatedBoard = {
        ...board,
        card_list_ids_order: newCardListOrder,
      }
      boardsApi.updateBoard(board.id, updatedBoard)
      dispatch(boardUpdated(updatedBoard))
      return;
    }

    const home = cardLists[source.droppableId];
    const foreign = cardLists[destination.droppableId];

    if (home === foreign) {
      const newCardIds = [...home.card_ids_order]
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const updatedCardList = {
        ...home,
        card_ids_order: newCardIds,
      }
      cardListsApi.updateCardList(updatedCardList.id, updatedCardList)
      dispatch(cardListUpdated(updatedCardList))
      return;
    }

    const homeCardIds = [...home.card_ids_order]
    homeCardIds.splice(source.index, 1);
    const updatedHomeCardList = {
      ...home,
      card_ids_order: homeCardIds,
    }
    cardListsApi.updateCardList(updatedHomeCardList.id, updatedHomeCardList)
    dispatch(cardListUpdated(updatedHomeCardList))

    const foreignCardIds = [...foreign.card_ids_order]
    foreignCardIds.splice(destination.index, 0, draggableId);
    const updatedForeignCardList = {
      ...foreign,
      card_ids_order: foreignCardIds,
    }
    cardListsApi.updateCardList(updatedForeignCardList.id, updatedForeignCardList)
    dispatch(cardListUpdated(updatedForeignCardList))


    const updatedCard = {
      ...cards[draggableId],
      card_list_id: foreign.id,
    }
    cardsApi.updateCard(updatedCard.id, updatedCard)
    dispatch(cardUpdated(updatedCard))
    return
  };

  let isPhone = useMediaQuery({
    query: '(max-width: 640px)'
  })

  const handleMouseMove = (e) => {
    const percent = e.pageX / window.innerWidth
    if (!horizontalScrollable && (
      percent < 0.3 || percent > 0.7
    )) {
      setHorizontalScrollable(true)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setHorizontalScrollable(false)}>
      <ScrollContainer
        horizontal={horizontalScrollable}
        vertical={isPhone}
        hideScrollbars={false}
        className="sm:h-full pb-4 flex flex-col sm:overflow-x-scroll sm:flex-row flex-nowrap justify-start items-start gap-1 cursor-default">
      <Droppable
          droppableId="all-card-lists"
          direction={isPhone ? 'vertical' : 'horizontal'}
          type="cardList"
      >
        {provided => (
            <div
              onMouseMove={handleMouseMove}
              className="sm:pl-2 w-full sm:w-auto flex flex-col sm:flex-row flex-nowrap justify-start items-start gap-1"
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
            py-3 px-2 my-2 mx-auto sm:ml-0 sm:mr-2 w-11/12 sm:w-72
            flex-shrink-0
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
      </ScrollContainer>

      <NewCardList isOpen={newListModalIsOpen} setIsOpen={setNewListModalIsOpen} />
    </DragDropContext>
  )
}

const InnerList = ({ cardList, cardMap, index }) => {
  const cards = cardList.card_ids_order.map(cardId => cardMap[cardId]);
  return <CardList cardList={cardList} cards={cards} index={index} />;
}