import { when, observable, action, computed, decorate, autorun } from "mobx";
import { fetchItems as fetchItemsFromApi } from "../utils/api";

class News {
  @observable items = {};
  @observable loading = false;

  @action.bound getItems(ids) {
    this.loading = true;

    // Check which items are missing from the store
    const missing = ids.filter(
      id => !Object.keys(this.items).includes(String(id))
    );

    if (missing.length === 0) {
      // All items are already present! Use existing items
      this.loading = false;
      return Promise.resolve(this.items);
    } else {
      // Fetch new items where needed
      return fetchItemsFromApi(missing).then(data => {
        const newItems = data.reduce(
          (total, item) => ({ ...total, [item.id]: item }),
          {}
        );

        this.items = { ...this.items, ...newItems };
        this.loading = false;
      });
    }
  }
}

export default News;
