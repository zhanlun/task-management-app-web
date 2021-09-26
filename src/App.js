import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "./actions/boards";
import { Board } from "./components/Boards/Board";
import { Navbar } from "./components/Layout/Navbar";

function App() {
  const boards = useSelector(state => state.boards)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBoards())
  }, [])

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-16 pb-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {
            boards.map(board => (
              <Board key={board.id} board={board} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
