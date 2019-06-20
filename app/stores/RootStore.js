import { configure } from "mobx";
//
import News from "./News";
import NewsLists from "./NewsLists";

configure({ enforceActions: "always" }); // strict mode

class RootStore {
  constructor() {
    this.newsStore = new News(this);
    this.newsListsStore = new NewsLists(this);
  }
}

const store = new RootStore();
export default store;
