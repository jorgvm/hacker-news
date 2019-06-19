import { observable, action, computed, decorate } from "mobx";
//
import { fetchList as fetchListApi } from "../utils/api";

class NewsLists {
  @observable loading = false;

  @observable items = {
    new: [],
    top: [],
    best: [],
    ask: []
  };

  @action.bound fetchlist(type) {
    this.loading = true;

    if (this.items[type].length > 0) {
      // Use existing list
      this.loading = false;
      return Promise.resolve(this.items[type]);
    } else {
      // Fetch new list
      return fetchListApi(type).then(({ data }) => {
        this.loading = false;
        this.items[type] = data.slice(0, 10);
      });
    }
  }
}

const store = new NewsLists();
export default store;
