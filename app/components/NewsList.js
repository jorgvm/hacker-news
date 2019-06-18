import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import { fetchList, fetchItem } from "../utils/api";

class List extends React.Component {
  _isMounted = false;

  state = {
    items: null,
    error: null
  };

  componentDidMount() {
    this._isMounted = true;
    this.handleFetchList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.type !== this.props.type) {
    //   // this.handleFetch();
    // }
  }

  handleFetchList = () => {
    const listStore = this.props.NewsLists;
    const newsStore = this.props.News;
    const type = this.props.type;

    listStore
      .fetchlist(type)
      .then(() => {
        const items = listStore.items[type];
        this.props.News.getItems(items);
      })
      .catch(error => {
        if (this._isMounted) {
          this.setState({
            error: `Oops, there seems to be an error loading "${this.props.type}" items`
          });
        }
      });
  };

  render() {
    const newsStore = this.props.News;
    const listStore = this.props.NewsLists;
    const type = this.props.type;

    if (this.state.error) return this.state.error;
    if (newsStore.loading) return <Loading />;

    // return "___" + JSON.stringify(listStore.items[type].length > 0);
    //
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
