import { observable, action, computed, decorate } from "mobx";
//
import { fetchList as fetchListApi } from "../utils/api";

class NewsLists {
  @observable items = {
    new: [],
    top: [],
    best: [],
    ask: []
  };

  @action.bound fetchlist(type) {
    if (this.items[type].length > 0) {
      console.log("use old list");
      return Promise.resolve(this.items[type]);
    } else {
      console.log("fetch new list");
      return fetchListApi(type).then(({ data }) => {
        this.items[type] = data.slice(0, 10);
      });
    }
  }
}

const store = new NewsLists();
export default store;
