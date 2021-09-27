import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getBoards } from '../../actions/boards'
import { NewBoard } from '../Boards/NewBoard'

export const Dashboard = () => {
  const { boardId } = useParams()
  const dispatch = useDispatch()
  const boards = useSelector(state => state.boards)
  const board = boards.find(board => board.id.toString() === boardId)

  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    if (boards.length === 0) {
      dispatch(getBoards())
    }
  })

  return (
    <div className="w-full mt-2 h-full flex flex-col mx-auto">
      <div className="bg-gray-700 bg-opacity-50 w-full p-1 mx-auto flex-grow">
        {
          board && (
            <div>
              <button
                type="button"
                onClick={(e) => {
                  console.log(board)
                  e.preventDefault()
                  setEditOpen(true)
                }}
                className={"px-2 py-1 m-2 rounded bg-yellow-500 bg-opacity-80  text-white font-semibold hover:bg-opacity-100 "}
              >
                <span className="text-xl">
                  {board.name}
                </span>
              </button>
              <div>
                {/* put lists and cards */}
              </div>
            </div>
          )
        }
      </div>

      <NewBoard isOpen={editOpen} setIsOpen={setEditOpen} board={board} />

    </div>
  )
}
