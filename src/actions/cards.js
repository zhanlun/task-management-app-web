import * as api from '../api/cards'
import { CREATE_BY_CARD_LIST, DELETE, GET_ALL_BY_BOARD, UPDATE } from '../constants/actionType/cards'
import { arrayToMapReduceFunction } from '../util/arrayToDictionary'

export const getCardsByBoard = (boardId) => async (dispatch) => {
  try {
    const { data } = await api.getAllCardsByBoardId(boardId)
    const dataDictionary = data.reduce(arrayToMapReduceFunction, {})
    return dispatch({ type: GET_ALL_BY_BOARD, payload: dataDictionary })
  } catch (error) {
    console.log(error)
  }
}

export const createCardByCardList = (cardListId, card) => async (dispatch) => {
  try {
    const { data } = await api.createCardByCardListId(cardListId, card)
    return dispatch({ type: CREATE_BY_CARD_LIST, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updateCard = (id, card) => async (dispatch) => {
  try {
    const { data } = await api.updateCard(id, card)

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteCard = (id) => async (dispatch) => {
  try {
    await api.deleteCard(id)

    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}