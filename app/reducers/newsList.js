export default function newsList(state = { items: {} }, action) {
  switch (action.type) {
    default:
      return state;

    case "NEWS_LIST_LOADING":
      return {
        ...state,
        error: null,
        loading: typeof action.status !== "undefined" ? !!action.status : true
      };

    case "SET_LIST":
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
  }
}
