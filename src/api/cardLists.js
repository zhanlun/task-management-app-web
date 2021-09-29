import axios from "axios";
import { rootApiUrl } from ".";

const urlByBoard = `${rootApiUrl}/boards`
const urlByCardList = `${rootApiUrl}/card-lists`

export const getAllCardListsByBoardId = (boardId) => axios.get(`${urlByBoard}/${boardId}/card-lists`)
export const createCardListsByBoardId = (boardId, data) => axios.post(`${urlByBoard}/${boardId}`, data)
export const updateCardList = (id, data) => axios.patch(`${urlByCardList}/${id}`, data)
export const deleteCardList = (id) => axios.delete(`${urlByCardList}/${id}`)