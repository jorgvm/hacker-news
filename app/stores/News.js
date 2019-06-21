import { runInAction, observable, action } from "mobx";
import { fetchItems as fetchItemsFromApi } from "../utils/api";

class News {
  @observable items = {};
  @observable loading = false;

  @action.bound getItems({ ids = [], fetchChildren = false } = {}) {
    this.loading = true;

    // Check which items are missing from the store
    const missing = ids.filter(
      id => !Object.keys(this.items).includes(String(id))
    );

    // If fetching children, always update the parent as well
    if (!fetchChildren && missing.length === 0) {
      // All items are already present! Use existing items
      this.loading = false;
      return Promise.resolve(this.items);
    } else {
      /* With children:    fetch all ids
         Without children: only fetch missing items*/
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
    return fetchItemsFromApi(ids)
      .then(data => {
        // Convert array to indexed object
        const newItems = data.reduce(
          (total, item) =>
            item.deleted ? total : { ...total, [item.id]: item },
          {}
        );

        // Add to store
        runInAction(() => {
          this.items = { ...this.items, ...newItems };
          this.loading = false;
        });

        return newItems;
      })
      .catch(error => {
        runInAction(() => {
          this.loading = false;
        });

        console.error("Error fetching an item", error);
      });
  }
}

export default News;
