import { CREATE, DELETE, GET_ALL, UPDATE, UPDATE_CHILD_ID_ORDER } from "../constants/actionType/boards"

const boardsReducer = (boards = [], action) => {
  switch (action.type) {
    case GET_ALL:
      return action.payload
    case CREATE:
      return [...boards, action.payload]
    case UPDATE:
    case UPDATE_CHILD_ID_ORDER:
      return boards.map(board => board.id === action.payload.id ? action.payload : board)
    case DELETE:
      return boards.filter(board => board.id !== action.payload)

    default:
      return boards
  }
}
export default boardsReducer