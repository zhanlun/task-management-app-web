import { CREATE_BY_CARD_LIST, DELETE, GET_ALL_BY_BOARD, UPDATE } from "../constants/actionType/cards"

const cardsReducer = (cards = {}, action) => {
  switch (action.type) {
    case GET_ALL_BY_BOARD:
      return action.payload
    case CREATE_BY_CARD_LIST:
    case UPDATE:
      return { ...cards, [action.payload.id]: action.payload }
    case DELETE:
      const { [action.payload]: _, ...newState } = cards
      return newState

    default:
      return cards
  }
}
export default cardsReducer