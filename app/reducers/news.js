export default function news(state = { items: {} }, action) {
  switch (action.type) {
    default:
      return state;

    case "NEWS_LOADING":
      return {
        ...state,
        error: null,
        loading: action.loading || true
      };

    case "SET_NEWS":
      // convert  to indexed object
      const indexed = action.news.reduce(
        (total, item) => (item.deleted ? total : { ...total, [item.id]: item }),
        {}
      );

      return {
        ...state,
        error: null,
        loading: false,
        items: {
          ...state.items,
          ...indexed
        }
      };
  }
}
