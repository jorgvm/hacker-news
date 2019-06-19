import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import { fetchList, fetchItem } from "../utils/api";

class List extends React.Component {
  state = {
    items: null
  };

  componentDidMount() {
    this.handleFetchList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.handleFetchList();
    }
  }

  handleFetchList = () => {
    const { newsStore, newsListsStore } = this.props.rootstore;

    const type = this.props.type;

    newsListsStore.fetchlist(type).then(() => {
      // const items = newsListsStore.items[type];
      // newsStore.getItems(items);
    });
  };

  render() {
    const { newsStore, newsListsStore } = this.props.rootstore;
    const type = this.props.type;

    if (!newsListsStore || newsListsStore.loading || newsStore.loading)
      return <Loading />;

    return (
      <ul className="news-list">
        {newsListsStore.items[type].length > 0 &&
          newsListsStore.items[type].map(id =>
            !newsStore.items[id] ? null : (
              <li key={id}>
                <NewsItem {...newsStore.items[id]} />
              </li>
            )
          )}
      </ul>
    );
  }
}

export default inject("rootstore")(observer(List));
