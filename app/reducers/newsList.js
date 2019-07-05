export default function newsList(state = {}, action) {
  switch (action.type) {
    default:
      return state;

    case "NEWS_LIST_LOADING":
      return {
        ...state,
        error: null,
        loading: true
      };

    case "RECEIVE_LIST":
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
