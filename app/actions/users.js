import { fetchUser as fetchUserApi } from "../utils/api";
import { getItems } from "./news";

export function getUser({ username }) {
  return (dispatch, getState) => {
    const existingUsers = getState().users.users;

    if (!Object.keys(existingUsers).includes(username)) {
      // User does not exist yet
      dispatch({
        type: "USER_LOADING"
      });

      // Query API
      fetchUser({ username, dispatch });
    }
  };
}

export function fetchUser({ username, dispatch }) {
  fetchUserApi(username)
    .then(({ data }) => {
      dispatch({
        type: "USER_SET",
        user: data
      });

      // If the user has posts, load them
      const limitedComments = data.submitted && data.submitted.slice(0, 10);
      if (limitedComments) {
        dispatch(getItems({ list: limitedComments }));
      }
    })
    .catch(error => {
      dispatch({
        type: "USER_ERROR",
        error: "Sorry, there seems to be a problem with a server"
      });
    });
}
