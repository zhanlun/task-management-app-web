import { createSlice } from "@reduxjs/toolkit"

const boardsSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    boardsFetched(state, action) {
      return action.payload
    },
    boardCreated(state, action) {
      state.push(action.payload)
    },
    boardUpdated(state, action) {
      const board = state.find(board => board.id === action.payload.id)
      board.title = action.payload.title
      board.card_list_ids_order = action.payload.card_list_ids_order
      board.last_update_date = action.payload.last_update_date
      board.disable_public_edit = action.payload.disable_public_edit
    },
    boardDeleted(state, action) {
      return state.filter((board) => board.id !== action.payload)
    },
  }
})

export const { boardsFetched, boardCreated, boardDeleted, boardUpdated } = boardsSlice.actions
export default boardsSlice.reducer