import axios from "axios";
import { rootApiUrl } from ".";
import { tokenConfig } from "./auth";

const url = `${rootApiUrl}/boards`

const getAllBoards = () => axios.get(url, tokenConfig())
const getBoardById = (id) => axios.get(`${url}/${id}`, tokenConfig())
const createBoard = (data) => axios.post(url, data, tokenConfig())
const updateBoard = (id, data) => axios.patch(`${url}/${id}`, data, tokenConfig())
const deleteBoard = (id) => axios.delete(`${url}/${id}`, tokenConfig())
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