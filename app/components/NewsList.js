import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";

@inject("rootstore")
@observer
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
    newsListsStore.getList(type, forceUpdate);
  };

  render() {
    const { newsStore, newsListsStore } = this.props.rootstore;
    const type = this.props.type;

    const UpdateButton = ({ text = "update" }) => {
      return (
        <button
          className="update"
          onClick={this.handleFetchList.bind(null, true)}
        >
          {newsListsStore.loading ? "loading..." : text}
        </button>
      );
    };

    if (newsListsStore.error) return <UpdateButton text={"Error, try again"} />;
    if (newsStore.loading || newsListsStore.loading) return <Loading />;

    return (
      <>
        <UpdateButton />
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

export default List;
