import { fetchUser as fetchUserApi } from "../utils/api";
import { getItems } from "./news";

export function getUser(username) {
  return dispatch => {
    dispatch({
      type: "USER_LOADING"
    });

    return fetchUserApi(username).then(({ data }) => {
      dispatch({
        type: "SET_USER",
        user: data
      });

      const limitedComments = data.submitted?.slice(0, 10);
      if (limitedComments) {
        dispatch(getItems(limitedComments));
      }
    });
  };
}
