import { CREATE_BY_BOARD, DELETE, GET_ALL_BY_BOARD, UPDATE } from "../constants/actionType/cardLists"

const cardListsReducer = (cardLists = [], action) => {
  switch (action.type) {
    case GET_ALL_BY_BOARD:
      return action.payload
    case CREATE_BY_BOARD:
      return [...cardLists, action.payload]
    case UPDATE:
      return cardLists.map(cardList => cardList.id === action.payload.id ? action.payload : cardList)
    case DELETE:
      return cardLists.filter(cardList => cardList.id !== action.payload)

    default:
      return cardLists
  }
}
export default cardListsReducer