import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import boardsApi from '../../api/boards'
import cardListsApi from '../../api/cardLists'
import cardsApi from '../../api/cards'
import { boardsFetched } from '../../reducers/boards'
import { cardListsFetched } from '../../reducers/cardLists'
import { cardsFetched } from '../../reducers/cards'
import { arrayToMapReduceFunction } from '../../util/arrayToDictionary'
import { NewBoard } from '../Boards/NewBoard'
import { ListWrapper } from './ListWrapper'

export const Dashboard = () => {
  const { boardId } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const boards = useSelector(state => state.boards)
  const board = boards.find(board => board.id.toString() === boardId)

  const [editOpen, setEditOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const fetchRelatedData = useCallback(async () => {
    const { data: fetchedCardLists } = await cardListsApi.getAllCardListsByBoardId(boardId)
    const { data: fetchedCards } = await cardsApi.getAllCardsByBoardId(boardId)

    const fetchedCardListsDict = fetchedCardLists.reduce(arrayToMapReduceFunction, {})
    const fetchedCardsDict = fetchedCards.reduce(arrayToMapReduceFunction, {})
    dispatch(cardListsFetched(fetchedCardListsDict))
    dispatch(cardsFetched(fetchedCardsDict))
    setIsReady(true)
  }, [boardId, dispatch])

  const fetchBoards = useCallback(() => {
    boardsApi.getBoardById(boardId)
      .then(response => {
        const fetchedBoard = response.data
        dispatch(boardsFetched([fetchedBoard]))
      })
      .catch(error => {
        console.log(error)
      })
  }, [dispatch, boardId])

  useEffect(() => {
    fetchBoards()

    if (board) {
      fetchRelatedData()
    }
  }, [board, boardId, fetchRelatedData, fetchBoards])

  const isSameUser = user && user.id && board && user.id === board.created_by

  return (
    <div className="w-full mt-2 h-full flex flex-col mx-auto">
      <div className="w-full py-1 px-0 h-full mx-auto flex-grow">
        {
          board && (
            <div className="h-full">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()

                  if (!isSameUser)
                    return

                  setEditOpen(true)
                }}
                className={`px-2 py-1 mx-4 my-2 sm:mx-2 rounded bg-yellow-500 bg-opacity-80  text-white font-semibold hover:bg-opacity-100 
                ${isSameUser ? 'cursor-pointer' : 'cursor-text'}
                `}
              >
                <span className="text-xl">
                  {board.title}
                </span>
              </button>
              {/* put lists and cards */}
              {
                isReady &&
                <ListWrapper board={board} />
              }
            </div>
          )
        }
      </div>

      <NewBoard isOpen={editOpen} setIsOpen={setEditOpen} board={board} />

    </div>
  )
}
