import { CREATE_BY_CARD_LIST, DELETE, GET_ALL_BY_BOARD, UPDATE } from "../constants/actionType/cards"

const cardsReducer = (cards = [], action) => {
  switch (action.type) {
    case GET_ALL_BY_BOARD:
      return action.payload
    case CREATE_BY_CARD_LIST:
      return [...cards, action.payload]
    case UPDATE:
      return cards.map(card => card.id === action.payload.id ? action.payload : card)
    case DELETE:
      return cards.filter(card => card.id !== action.payload)

    default:
      return cards
  }
}
export default cardsReducer