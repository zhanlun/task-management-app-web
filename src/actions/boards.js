
import * as api from '../api/boards'
import { CREATE, DELETE, GET_ALL, UPDATE, UPDATE_CHILD_ID_ORDER } from '../constants/actionType/boards'

export const getBoards = () => async (dispatch) => {
  try {
    const { data } = await api.getAllBoards()

    dispatch({ type: GET_ALL, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const createBoard = (board) => async (dispatch) => {
  try {
    const { data } = await api.createBoard(board)
    return dispatch({ type: CREATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const updateBoard = (id, board) => async (dispatch) => {
  try {
    const { data } = await api.updateBoard(id, board)

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const deleteBoard = (id) => async (dispatch) => {
  try {
    await api.deleteBoard(id)

    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error)
  }
}

export const updateCardListIdOrder = (id, childIdOrder) => async (dispatch) => {
  try {
    const { data } = await api.updateCardListIdOrder(id, childIdOrder)

    return dispatch({ type: UPDATE_CHILD_ID_ORDER, payload: data })
  } catch (error) {
    console.log(error)
  }
}