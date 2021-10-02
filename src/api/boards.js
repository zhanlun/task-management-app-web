import axios from "axios";
import { rootApiUrl } from ".";

const url = `${rootApiUrl}/boards`

const getAllBoards = () => axios.get(url)
const getBoardById = (id) => axios.get(`${url}/${id}`)
const createBoard = (data) => axios.post(url, data)
const updateBoard = (id, data) => axios.patch(`${url}/${id}`, data)
const deleteBoard = (id) => axios.delete(`${url}/${id}`)
const updateCardListIdOrder = (id, childIdOrder) => axios.patch(`${url}/${id}/card-lists`, {
  card_list_ids_order: childIdOrder,
})

const boardsApi = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  updateCardListIdOrder,
}

export default boardsApi