import { CREATE, DELETE, GET_ALL, UPDATE } from "../constants/actionType/boards"

const boardsReducer = (boards = [], action) => {
  switch (action.type) {
    case GET_ALL:
      return action.payload
    case CREATE:
      return [...boards, action.payload]
    case UPDATE:
      return boards.map(board => board.id === action.payload.id ? action.payload : board)
    case DELETE:
      return boards.filter(board => board.id !== action.payload)

    default:
      return boards
  }
}
export default boardsReducer