import { configureStore } from '@reduxjs/toolkit'

import boardsReducer from './reducers/boards'
import cardListsReducer from './reducers/cardLists'
import cardsReducer from './reducers/cards'
import userReducer from './reducers/user'

export default configureStore({
  reducer: {
    boards: boardsReducer,
    cardLists: cardListsReducer,
    cards: cardsReducer,
    user: userReducer,
  },
})
