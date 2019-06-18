import { observable, action, computed, decorate } from "mobx";
import { fetchItems as fetchItemsFromApi } from "../utils/api";

class News {
  @observable items = {};
  @observable loading = true;

  @action.bound getItems(ids) {
    this.items = {};
    this.loading = true;

    return fetchItemsFromApi(ids).then(data => {
      const items = data.reduce(
        (total, item) => ({ ...total, [item.id]: item }),
        {}
      );
      this.setItems(items);
    });
  }

  @action.bound setItems(newItems) {
    this.items = { ...this.items, ...newItems };
    this.loading = false;
  }

  @computed get quickgetitems() {
    return this.items;
  }

  @computed get getloading() {
    return this.loading;
  }
}

const store = new News();
export default store;
