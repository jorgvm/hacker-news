import { fetchItems as fetchItemsFromApi } from "../utils/api";

export function getItems({ list, fetchChildren = false } = {}) {
  return (dispatch, getState) => {
    // Check which items are missing from the store
    const existingItems = getState().news.items;
    const missingItems = list.filter(
      id => !Object.keys(existingItems).includes(String(id))
    );

    // If fetching children, or there are missing items, fetch items
    if (fetchChildren || missingItems.length > 0) {
      dispatch({
        type: "NEWS_LOADING"
      });

      // Get items from API
      fetchItems({ fetchChildren, list, dispatch });
    }
  };
}

export function fetchItems({ fetchChildren, list, dispatch }) {
  fetchItemsFromApi(list)
    .then(data => {
      dispatch({
        type: "NEWS_SET",
        news: data
      });

      if (fetchChildren) {
        Object.values(data).forEach(item => {
          // If item has kids, fetch them
          item.kids && dispatch(getItems({ list: item.kids.slice(0, 20) }));
        });
      }
    })
    .catch(error => {
      dispatch({
        type: "NEWS_ERROR",
        error: "There seems to be a problem loading a news item"
      });
    });
}
