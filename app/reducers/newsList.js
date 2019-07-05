export default function newsList(state = { items: {} }, action) {
  switch (action.type) {
    default:
      return state;

    case "NEWS_LIST_LOADING":
      return {
        ...state,
        error: null,
        loading: true
      };

    case "NEWS_LIST_SET":
      const { list, listType } = action;

      return {
        ...state,
        error: null,
        loading: false,
        items: {
          ...state.items,
          [listType]: list
        }
      };

    case "NEWS_LIST_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false
      };
  }
}
