import { createSlice } from "@reduxjs/toolkit"

const cardListsSlice = createSlice({
  name: 'cardLists',
  initialState: {},
  reducers: {
    cardListsFetched(state, action) {
      return action.payload
    },
    cardListCreated(state, action) {
      state[action.payload.id] = action.payload
    },
    cardListUpdated(state, action) {
      state[action.payload.id] = action.payload
    },
    cardListDeleted(state, action) {
      delete state[action.payload]
    },
  }
})

export const { cardListsFetched, cardListCreated, cardListDeleted, cardListUpdated } = cardListsSlice.actions
export default cardListsSlice.reducer