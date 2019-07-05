import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import { getList } from "../actions/newsList";

class List extends React.Component {
  componentDidMount() {
    this.handleFetchList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.handleFetchList();
    }
  }

  handleFetchList = (forceUpdate = false) => {
    const { dispatch, type } = this.props;

    dispatch(getList({ listType: type, forceUpdate }));
  };

  render() {
    const { newsList, news, type } = this.props;

    const UpdateButton = ({ text = "update" }) => {
      return (
        <button
          className="update"
          onClick={this.handleFetchList.bind(null, true)}
        >
          {newsList.loading ? "loading..." : text}
        </button>
      );
    };

    if (newsList.error) return <UpdateButton text={"Error, try again"} />;
    if (
      news.loading ||
      newsList.loading ||
      !newsList?.items?.[type] ||
      !news?.items
    )
      return <Loading />;

    return (
      <>
        <UpdateButton />
        <ul className="news-list">
          {newsList.items[type].map(id =>
            !news.items[id] ? null : (
              <li key={id}>
                <NewsItem {...news.items[id]} error={null} />
              </li>
            )
          )}
        </ul>
      </>
    );
  }
}

function mapStateToProps({ newsList, news }) {
  return { newsList, news };
}

export default connect(mapStateToProps)(List);
