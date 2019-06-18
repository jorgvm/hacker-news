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
    return fetchListApi(type).then(({ data }) => {
      this.items[type] = data.slice(0, 10);
    });
  }
}

const store = new NewsLists();
export default store;
