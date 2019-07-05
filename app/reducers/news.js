export default function news(state = { items: {} }, action) {
  switch (action.type) {
    default:
      return state;

    case "NEWS_LOADING":
      return {
        ...state,
        error: null,
        loading: true
      };

    case "NEWS_SET":
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

    case "NEWS_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false
      };
  }
}
