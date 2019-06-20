import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import Comment from "./Comment";

class NewsDetail extends React.Component {
  state = {};

  componentDidMount() {
    this.handleFetchItems();
  }

  handleFetchItems = () => {
    const { newsStore } = this.props.rootstore;
    const itemId = this.props.match.params.id;

    newsStore.getItems({
      ids: [itemId],
      fetchChildren: true
    });
  };

  render() {
    const { newsStore } = this.props.rootstore;
    const itemId = this.props.match.params.id;
    const newsItem = newsStore.items[itemId];

    if (newsStore.loading) return <Loading />;

    return (
      <div className="item-detail">
        <NewsItem {...newsItem}>
          {props => (
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: props.text }}
            />
          )}
        </NewsItem>

        {newsItem.kids && (
          <div className="comments">
            {newsItem.kids.map(commentId => {
              return newsStore.items[commentId] ? (
                <Comment key={commentId} {...newsStore.items[commentId]} />
              ) : (
                "kan niet vinden"
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

// {newsItem.kids && (
//   <div className="comments">
//     {newsItem.kids.map(comment =>
//       newsStore.items[comment.id] ? (
//         <Comment key={comment.id} {...newsStore.items[comment.id]} />
//       ) : (
//         "kan niet vinden"
//       )
//     )}
//   </div>
// )}

export default inject("rootstore")(observer(NewsDetail));
