import { configure } from "mobx";
//
import News from "./News";
import NewsLists from "./NewsLists";
import Users from "./Users";

// strict mode
configure({ enforceActions: "always" });

class RootStore {
  constructor() {
    this.newsStore = new News(this);
    this.newsListsStore = new NewsLists(this);
    this.userStore = new Users(this);
  }
}

const store = new RootStore();
export default store;
