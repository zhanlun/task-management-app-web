import { createSlice } from "@reduxjs/toolkit"

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {},
  reducers: {
    cardsFetched(state, action) {
      return action.payload
    },
    cardCreated(state, action) {
      state[action.payload.id] = action.payload
    },
    cardUpdated(state, action) {
      state[action.payload.id] = action.payload
    },
    cardDeleted(state, action) {
      delete state[action.payload]
    },
  }
})

export const { cardsFetched, cardCreated, cardDeleted, cardUpdated } = cardsSlice.actions
export default cardsSlice.reducer