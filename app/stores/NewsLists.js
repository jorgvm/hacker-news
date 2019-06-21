import { runInAction, observable, action } from "mobx";
//
import { fetchList as fetchListApi } from "../utils/api";

class NewsLists {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable loading = false;
  @observable error = false;

  @observable items = {
    new: [],
    top: [],
    best: [],
    ask: []
  };

  @action.bound getList(type, forceUpdate = false) {
    if (!forceUpdate && this.items[type].length > 0) {
      // Use existing list
      this.loading = false;
      this.error = false;
      return Promise.resolve(this.items[type]);
    } else {
      // Loading
      this.loading = true;
      this.error = false;
      this.fetchList(type);
    }
  }

  @action.bound fetchList(type) {
    // Fetch new list
    return fetchListApi(type)
      .then(({ data }) => {
        // Set limited amount of items
        const limitedItems = data.slice(0, 10);

        runInAction(() => {
          this.items[type] = limitedItems;
          this.loading = false;
        });

        // Check if items are already loaded in news store
        this.rootStore.newsStore.getItems({ ids: limitedItems });
      })
      .catch(error => {
        runInAction(() => {
          this.error = String(error);
          this.loading = false;
        });
      });
  }
}

export default NewsLists;
