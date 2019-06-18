import React from "react";
import PropTypes from "prop-types";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import { fetchList, fetchItem } from "../utils/api";

class Top extends React.Component {
  state = {
    items: null,
    error: null
  };

  componentDidMount() {
    this.handleFetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.handleFetch();
    }
  }

  handleFetch = () => {
    this.setState({ items: null, error: null });

    fetchList(this.props.type)
      .then(({ data }) =>
        this.setState({
          items: data
        })
      )
      .catch(error =>
        this.setState({
          error: `Oops, there seems to be an error loading "${this.props.type}" items`
        })
      );
  };

  render() {
    if (this.state.error) return this.state.error;
    if (!this.state.items) return <Loading />;

    return (
      <ul className="news-list">
        {this.state.items.map(item => (
          <li key={item.id}>
            <NewsItem {...item} />
          </li>
        ))}
      </ul>
    );
  }
}

export default Top;
