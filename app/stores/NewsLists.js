import { observable, action, computed, decorate } from "mobx";
//
import { fetchList as fetchListApi } from "../utils/api";

class NewsLists {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable loading = false;

  @observable items = {
    new: [],
    top: [],
    best: [],
    ask: []
  };

  @action.bound fetchlist(type, forceUpdate = false) {
    if (!forceUpdate && this.items[type].length > 0) {
      // Use existing list
      this.loading = false;
      return Promise.resolve(this.items[type]);
    } else {
      // Loading
      this.loading = true;

      // Fetch new list
      return fetchListApi(type).then(({ data }) => {
        // Set items
        const limitedItems = data.slice(0, 10);
        this.items[type] = limitedItems;
        this.loading = false;

        // Check if items are already loaded in news store
        this.rootStore.newsStore.getItems(limitedItems);
      });
    }
  }
}

// const store = new NewsLists();
export default NewsLists;
