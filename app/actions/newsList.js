import { getItems } from "./news";
import { fetchList as fetchListApi } from "../utils/api";

export function getList({ listType, forceUpdate = false } = {}) {
  return (dispatch, getState) => {
    const existingList = getState().newsList.items?.[listType];

    // Check if list already exists
    if (forceUpdate || !existingList) {
      dispatch({
        type: "NEWS_LIST_LOADING"
      });

      fetchList({ listType, dispatch });
    }
  };
}

export function fetchList({ listType, dispatch }) {
  return fetchListApi(listType).then(({ data }) => {
    const list = data.slice(0, 10);

    dispatch({
      type: "SET_LIST",
      listType,
      list
    });

    // Get all items from the list
    dispatch(getItems({ list }));
  });
}
