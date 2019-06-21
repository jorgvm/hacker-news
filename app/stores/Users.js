import { runInAction, observable, action } from "mobx";
//
import { fetchUser as fetchUserApi } from "../utils/api";

class Users {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable loading = false;

  @observable users = {};

  @action.bound getUser(username, forceUpdate = false) {
    if (!forceUpdate && this.users[username]) {
      // Use existing list
      this.loading = false;
      return Promise.resolve(this.users[username]);
    } else {
      // Loading
      this.loading = true;
      this.fetchUser(username);
    }
  }

  @action.bound fetchUser(username) {
    // Fetch user
    return fetchUserApi(username).then(({ data }) => {
      // Set items
      const limitedComments = data?.submitted?.slice(0, 10);

      runInAction(() => {
        this.users[username] = data;
        this.loading = false;

        // Check if comments have to be fetched
        if (limitedComments) {
          this.rootStore.newsStore.getItems({ ids: limitedComments });
        }
      });
    });
  }
}

export default Users;
