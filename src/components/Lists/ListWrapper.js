import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CardList } from './CardList';
import initialData from './data';
import { useMediaQuery } from 'react-responsive';
import { NewCardList } from './NewCardList';

export const ListWrapper = () => {
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

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    const home = data.columns[source.droppableId];
    const foreign = data.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newHome.id]: newHome,
        },
      };

      setData(newState);
      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
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
        droppableId="all-columns"
        direction={isPhone ? 'vertical' : 'horizontal'}
        type="column"
      >
        {provided => (
            <div
              className="sm:h-full flex flex-col sm:flex-row flex-wrap justify-start items-start gap-1"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              return (
                <InnerList
                  key={column.id}
                  column={column}
                  taskMap={data.tasks}
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
          `
          }>
          <span className={
            `
            text-white text-sm ml-2
            `
          }>
            + Add another list
          </span>
        </button>
      </div>

      <NewCardList isOpen={newListModalIsOpen} setIsOpen={setNewListModalIsOpen} />
    </DragDropContext>
  )
}

const InnerList = ({ column, taskMap, index }) => {
  const tasks = column.taskIds.map(taskId => taskMap[taskId]);
  return <CardList column={column} cards={tasks} index={index} />;
}