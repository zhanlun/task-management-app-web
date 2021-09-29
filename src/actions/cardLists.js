import * as api from '../api/cardLists'
import { CREATE_BY_BOARD, DELETE, GET_ALL_BY_BOARD, UPDATE } from '../constants/actionType/cardLists'

export const getCardListsByBoard = (boardId) => async (dispatch) => {
  try {
    const { data } = await api.getAllCardListsByBoardId(boardId)

    return dispatch({ type: GET_ALL_BY_BOARD, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createCardListByBoard = (boardId, cardList) => async (dispatch) => {
  try {
    const { data } = await api.createCardListsByBoardId(boardId, cardList)
    return dispatch({ type: CREATE_BY_BOARD, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updateCardList = (id, cardList) => async (dispatch) => {
  try {
    const { data } = await api.updateCardList(id, cardList)

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteCardList = (id) => async (dispatch) => {
  try {
    await api.deleteCardList(id)

    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}