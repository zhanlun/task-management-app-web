import React, { useCallback } from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsApi from '../../api/boards';
import { boardsFetched } from '../../reducers/boards';
import { Board } from "./Board";

export const BoardList = () => {
  const boards = useSelector(state => state.boards)
  const dispatch = useDispatch()

  const fetchBoards = useCallback(async () => {
    const { data: fetchedBoards } = await boardsApi.getAllBoards()
    dispatch(boardsFetched(fetchedBoards))
  }, [dispatch])

  useEffect(() => {
    fetchBoards()
  }, [fetchBoards])

  return (
    <div className="max-w-5xl mt-6 mx-auto px-16 pb-12">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {
          boards.map(board => (
            <Board key={board.id} board={board} />
          ))
        }
      </div>
    </div>
  )
}
