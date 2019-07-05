import { combineReducers } from "redux";

import news from "./news";
import newsList from "./newsList";
import users from "./users";

export default combineReducers({
  news,
  newsList,
  users
});
