import axios from "axios";
import { rootApiUrl } from ".";

const urlByBoard = `${rootApiUrl}/boards`
const urlByCardList = `${rootApiUrl}/card-lists`
const urlByCard = `${rootApiUrl}/cards`

const getAllCardsByBoardId = (boardId) => axios.get(`${urlByBoard}/${boardId}/cards`)
const createCardByCardListId = (cardListId, data) => axios.post(`${urlByCardList}/${cardListId}/cards`, data)
const updateCard = (id, data) => axios.patch(`${urlByCard}/${id}`, data)
const deleteCard = (id) => axios.delete(`${urlByCard}/${id}`)

const cardsApi = {
  getAllCardsByBoardId,
  createCardByCardListId,
  updateCard,
  deleteCard,
}

export default cardsApi