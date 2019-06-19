import News from "./News";
import NewsLists from "./NewsLists";

class RootStore {
  constructor() {
    this.newsStore = new News(this);
    this.newsListsStore = new NewsLists(this);
  }
}

const store = new RootStore();
export default store;
