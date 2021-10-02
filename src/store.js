import { configureStore } from '@reduxjs/toolkit'

import boardsReducer from './reducers/boards'
import cardListsReducer from './reducers/cardLists'
import cardsReducer from './reducers/cards'

export default configureStore({
  reducer: {
    boards: boardsReducer,
    cardLists: cardListsReducer,
    cards: cardsReducer,
  },
})
