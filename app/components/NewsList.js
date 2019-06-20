import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";

class List extends React.Component {
  componentDidMount() {
    this.handleFetchList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.handleFetchList();
    }
  }

  handleFetchList = forceUpdate => {
    const { newsStore, newsListsStore } = this.props.rootstore;
    const type = this.props.type;
    newsListsStore.fetchlist(type, forceUpdate);
  };

  render() {
    const { newsStore, newsListsStore } = this.props.rootstore;
    const type = this.props.type;

    if (newsStore.loading || newsListsStore.loading) return <Loading />;

    return (
      <>
        <button
          className="update"
          onClick={this.handleFetchList.bind(null, true)}
        >
          {newsListsStore.loading ? "loading..." : "update list"}
        </button>

        <ul className="news-list">
          {newsListsStore.items[type].map(id =>
            !newsStore.items[id] ? null : (
              <li key={id}>
                <NewsItem {...newsStore.items[id]} />
              </li>
            )
          )}
        </ul>
      </>
    );
  }
}

export default inject("rootstore")(observer(List));
