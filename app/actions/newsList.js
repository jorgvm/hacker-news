import { getItems } from "./news";
import { fetchList as fetchListApi } from "../utils/api";

export function requestList(listType) {
  return dispatch => {
    dispatch({
      type: "NEWS_LIST_LOADING"
    });

    return fetchListApi(listType).then(({ data }) => {
      const list = data.slice(0, 10);
      dispatch(receiveList({ listType, list }));
      dispatch(getItems({ list }));
    });
  };
}

export function receiveList({ listType, list }) {
  return {
    type: "RECEIVE_LIST",
    listType,
    list
  };
}
