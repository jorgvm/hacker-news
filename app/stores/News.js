import { observable, action, computed, decorate } from "mobx";
import { fetchItems as fetchItemsFromApi } from "../utils/api";

class News {
  @observable items = {};
  @observable loading = true;

  @action.bound getItems(ids) {
    // Check which items are missing from the store
    const missing = ids.filter(
      id => !Object.keys(this.items).includes(String(id))
    );

    console.log(missing);

    if (missing.length === 0) {
      return Promise.resolve(this.items);
    } else {
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

const store = new News();
export default store;
