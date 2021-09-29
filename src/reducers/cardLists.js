import { CREATE_BY_BOARD, DELETE, GET_ALL_BY_BOARD, UPDATE } from "../constants/actionType/cardLists"

const cardListsReducer = (cardLists = {}, action) => {
  switch (action.type) {
    case GET_ALL_BY_BOARD:
      return action.payload
    case CREATE_BY_BOARD:
    case UPDATE:
      return { ...cardLists, [action.payload.id]: action.payload }
    case DELETE:
      const { [action.payload]: _, ...newState } = cardLists
      return newState

    default:
      return cardLists
  }
}
export default cardListsReducer