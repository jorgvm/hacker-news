export default function users(state = {}, action) {
  switch (action.type) {
    default:
      return state;

    case "USER_LOADING":
      return {
        ...state,
        error: null,
        loading: true
      };

    case "SET_USER":
      return {
        ...state,
        error: null,
        loading: false,
        users: {
          ...state.users,
          [action.user.id]: action.user
        }
      };
  }
}
