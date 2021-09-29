const initialData = {
  cards: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner, eat food, drink juice, sleep, eat again, drink again, rest' },
  },
  cardLists: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      cardIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      cardIds: [],
    },
  },
  // Facilitate reordering of the columns
  cardListOrder: ['column-1', 'column-2'],
};

export default initialData;
