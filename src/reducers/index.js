
import { combineReducers } from "redux";
import boards from "./boards";
import cardLists from "./cardLists";
import cards from "./cards";

export const reducers = combineReducers({
  boards,
  cardLists,
  cards,
})