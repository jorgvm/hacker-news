import { configure, observable, action } from "mobx";
import { fetchItems as fetchItemsFromApi } from "../utils/api";

// configure({ enforceActions: "observed" }); // strict mode

class News {
  @observable items = {};
  @observable loading = true;

  @action.bound getItems({ ids = [], fetchChildren = false } = {}) {
    // Loading. Check which items are missing from the store
    this.loading = true;
    const missing = ids.filter(
      id => !Object.keys(this.items).includes(String(id))
    );

    // If fetching children, always update the parent as well
    if (!fetchChildren && missing.length === 0) {
      // All items are already present! Use existing items
      this.loading = false;
      return Promise.resolve(this.items);
    } else {
      // Fetch all ids
      // Or without children: fetch missing items from api
      return this.fetchItems(fetchChildren ? ids : missing).then(items => {
        if (fetchChildren) {
          Object.values(items).forEach(item => {
            // If item has kids, fetch them
            item.kids && this.getItems({ ids: item.kids });
          });
        }
      });
    }
  }

  @action.bound fetchItems(ids) {
    return fetchItemsFromApi(ids).then(data => {
      // Convert array to indexed object
      const newItems = data.reduce(
        (total, item) => ({ ...total, [item.id]: item }),
        {}
      );

      // Add to store
      this.items = { ...this.items, ...newItems };
      this.loading = false;
      return newItems;
    });
  }
}

export default News;
