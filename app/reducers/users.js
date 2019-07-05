export default function users(state = { users: {} }, action) {
  switch (action.type) {
    default:
      return state;

    case "USER_LOADING":
      return {
        ...state,
        error: null,
        loading: true
      };

    case "USER_SET":
      return {
        ...state,
        error: null,
        loading: false,
        users: {
          ...state.users,
          [action.user.id]: action.user
        }
      };

    case "USER_ERROR":
      return {
        ...state,
        error: action.error,
        loading: false
      };
  }
}
