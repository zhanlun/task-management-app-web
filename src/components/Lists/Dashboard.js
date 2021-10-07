import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import boardsApi from '../../api/boards'
import cardListsApi from '../../api/cardLists'
import cardsApi from '../../api/cards'
import { boardsFetched, boardUpdated } from '../../reducers/boards'
import { cardListsFetched } from '../../reducers/cardLists'
import { cardsFetched } from '../../reducers/cards'
import { arrayToMapReduceFunction } from '../../util/arrayToDictionary'
import { NewBoard } from '../Boards/NewBoard'
import { ListWrapper } from './ListWrapper'
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/outline'

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

  const fetchBoard = useCallback(() => {
    boardsApi.getBoardById(boardId)
      .then(response => {
        const fetchedBoard = response.data
        dispatch(boardsFetched([fetchedBoard]))
        fetchRelatedData()
      })
      .catch(error => {
        console.log(error)
      })
  }, [dispatch, fetchRelatedData, boardId])

  useEffect(() => {
    fetchBoard()
  }, [boardId, fetchBoard])

  const isSameUser = user && user.id && board && user.id === board.created_by

  return (
    <div className="w-full mt-2 h-full flex flex-col mx-auto">
      <div className="w-full py-1 px-0 h-full mx-auto flex-grow">
        {
          board && (
            <div className="h-full">
              <div className="flex justify-start">
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
                {
                  isSameUser &&
                  <>
                    <span className="mx-3 my-2 border-l-2 border-gray-400 border-opacity-50"></span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        const updatedBoard = {
                          ...board,
                          disable_public_edit: !board.disable_public_edit,
                        }
                        boardsApi.updateBoard(board.id, updatedBoard)
                        dispatch(boardUpdated(updatedBoard))
                      }}
                      className={`flex px-2 py-1 mx-4 my-2 sm:mx-2 rounded bg-purple-500 bg-opacity-80  text-white font-semibold hover:bg-opacity-100 
                    ${isSameUser ? 'cursor-pointer' : 'cursor-text'}
                    `}
                    >
                      {
                        board.disable_public_edit ?
                          <LockClosedIcon className="w-4 h-4 mr-2 mt-1" /> :
                          <LockOpenIcon className="w-4 h-4 mr-2 mt-1" />
                      }
                      <span className="text-base">
                        {
                          board.disable_public_edit ?
                            'Enable edit by public' :
                            'Disable edit by public'
                        }
                      </span>
                    </button>
                  </>
                }
              </div>
              {/* put lists and cards */}
              {
                !isReady ?
                  null :
                  board.disable_public_edit ?
                    <p className="p-12 bg-white">disabled: TODO</p> :
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
