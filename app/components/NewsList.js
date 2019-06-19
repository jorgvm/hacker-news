import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import { fetchList, fetchItem } from "../utils/api";

class List extends React.Component {
  state = {
    items: null,
    error: null
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
    const listStore = this.props.NewsLists;
    const newsStore = this.props.News;
    const type = this.props.type;

    listStore.fetchlist(type).then(() => {
      const items = listStore.items[type];
      newsStore.getItems(items);
    });
  };

  render() {
    const newsStore = this.props.News;
    const listStore = this.props.NewsLists;
    const type = this.props.type;

    if (this.state.error) return this.state.error;
    if (listStore.loading || newsStore.loading) return <Loading />;

    return (
      <ul className="news-list">
        {listStore.items[type].length > 0 &&
          listStore.items[type].map(id =>
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

export default inject("News", "NewsLists")(observer(List));
