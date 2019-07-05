import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dompurify from "dompurify";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import Comment from "./Comment";
import { getItems } from "../actions/news";

class NewsDetail extends React.Component {
  state = {};

  componentDidMount() {
    this.handleFetchItems();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.handleFetchItems();
    }
  }

  handleFetchItems = () => {
    const { news, dispatch } = this.props;
    const itemId = this.props.match.params.id;

    dispatch(getItems({ list: [itemId], fetchChildren: true }));
  };

  render() {
    const { news } = this.props;
    const itemId = this.props.match.params.id;
    const newsItem = news.items?.[itemId];

    if (!newsItem || news.loading) return <Loading />;

    return (
      <div className="item-detail">
        <NewsItem {...newsItem}>
          {props => (
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(props.text)
              }}
            />
          )}
        </NewsItem>

        {
          <div className="comments">
            {newsItem.kids?.map(commentId => {
              return news.items[commentId] ? (
                <Comment key={commentId} {...news.items[commentId]} />
              ) : null;
            })}
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ users, news }) {
  return { users, news };
}

export default connect(mapStateToProps)(NewsDetail);
