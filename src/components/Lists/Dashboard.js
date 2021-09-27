import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getBoards } from '../../actions/boards'
import { NewBoard } from '../Boards/NewBoard'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
      <div className="w-full p-1 mx-auto flex-grow">
        {
          board && (
            <div className="h-full">
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
              <div className="h-full flex flex-row flex-wrap justify-start gap-4">
                {/* put lists and cards */}
                <MyList />
                <MyList />
                <MyList />
                <MyList />
                <MyList />
                <MyList />
              </div>
            </div>
          )
        }
      </div>

      <NewBoard isOpen={editOpen} setIsOpen={setEditOpen} board={board} />

    </div>
  )
}

const initialItems = [
  {
    id: 'item-1',
    name: 'item 1',
  },
  {
    id: 'item-2',
    name: 'item 2',
  },
  {
    id: 'item-3',
    name: 'item 3',
  },
  {
    id: 'item-4',
    name: 'item 4',
  },
]

const MyList = () => {
  const [items, setItems] = useState(initialItems)

  function onDragEnd(result) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    setItems(newItems)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list-id-1">
        {provided => (
          <div
            className="flex-shrink-0 w-80 flex flex-col gap-2 p-4 rounded bg-gray-500 bg-opacity-50"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <ItemList items={items} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const ItemList = React.memo(({ items }) => {
  return items.map((item, index) => (
    <Item item={item} index={index} key={item.id} />
  ))
})

const Item = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {provided => (
        <div
          className="bg-gray-200 p-6 w-full mx-auto rounded shadow"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {item.name}
        </div>
      )}
    </Draggable>
  )
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};