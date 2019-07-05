import { fetchItems as fetchItemsFromApi } from "../utils/api";

export function getItems({ list, fetchChildren = false } = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: "NEWS_LOADING"
    });

    // Check which items are missing from the store
    const existingItems = getState().news.items;
    const missing = list.filter(
      id => !Object.keys(existingItems).includes(String(id))
    );

    // If fetching children, always update the parent
    // If there are no missing items, all done, remove loading
    if (!fetchChildren && missing.length === 0) {
      console.log("done, nothing missing");
      dispatch({
        type: "NEWS_LOADING",
        loading: false
      });
    } else {
      // Get items from API
      fetchItems({ fetchChildren, list, dispatch });
    }
  };
}

export function fetchItems({ fetchChildren, list, dispatch }) {
  fetchItemsFromApi(list).then(data => {
    dispatch({
      type: "SET_NEWS",
      news: data
    });

    if (fetchChildren) {
      console.log("get kids");
      Object.values(data).forEach(item => {
        // If item has kids, fetch them
        item.kids && dispatch(getItems({ list: item.kids.slice(0, 20) }));
      });
    }
  });
}
