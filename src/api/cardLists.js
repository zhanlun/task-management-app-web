import axios from "axios";
import { rootApiUrl } from ".";

const urlByBoard = `${rootApiUrl}/boards`
const urlByCardList = `${rootApiUrl}/card-lists`

const getAllCardListsByBoardId = (boardId) => axios.get(`${urlByBoard}/${boardId}/card-lists`)
const createCardListsByBoardId = (boardId, data) => axios.post(`${urlByBoard}/${boardId}/card-lists`, data)
const getCardListById = (id) => axios.get(`${urlByCardList}/${id}`)
const updateCardList = (id, data) => axios.patch(`${urlByCardList}/${id}`, data)
const deleteCardList = (id) => axios.delete(`${urlByCardList}/${id}`)
const updateCardIdOrder = (id, childIdOrder) => axios.patch(`${urlByCardList}/${id}/cards`, {
  card_ids_order: childIdOrder,
})

const cardListsApi = {
  getAllCardListsByBoardId,
  createCardListsByBoardId,
  getCardListById,
  updateCardList,
  deleteCardList,
  updateCardIdOrder,
}

export default cardListsApi