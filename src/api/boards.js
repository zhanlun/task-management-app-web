import axios from "axios";
import { rootApiUrl } from ".";

const url = `${rootApiUrl}/boards`

export const getAllBoards = () => axios.get(url)
export const createBoard = (data) => axios.post(url, data)
export const updateBoard = (id, data) => axios.patch(`${url}/${id}`, data)
export const deleteBoard = (id) => axios.delete(`${url}/${id}`)