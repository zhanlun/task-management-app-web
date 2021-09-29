import axios from "axios";
import { rootApiUrl } from ".";

const urlByBoard = `${rootApiUrl}/boards`
const urlByCardList = `${rootApiUrl}/card-lists`
const urlByCard = `${rootApiUrl}/cards`

export const getAllCardsByBoardId = (boardId) => axios.get(`${urlByBoard}/${boardId}/cards`)
export const createCardByCardListId = (cardListId, data) => axios.post(`${urlByCardList}/${cardListId}/card`, data)
export const updateCard = (id, data) => axios.patch(`${urlByCard}/${id}`, data)
export const deleteCard = (id) => axios.delete(`${urlByCard}/${id}`)