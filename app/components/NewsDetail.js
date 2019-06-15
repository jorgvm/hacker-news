import React from "react";
import PropTypes from "prop-types";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import Comment from "./Comment";
import { fetchItem, fetchComments } from "../utils/api";

class NewsDetail extends React.Component {
  state = {
    item: null,
    error: null,
    comments: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    fetchItem(id)
      .then(({ data, error }) => {
        this.setState({
          item: data
        });

        if (data.kids) {
          this.handleFetchComments(data.kids);
        } else {
          this.setState({ comments: 0 });
        }
      })
      .catch(error =>
        this.setState({
          error: "Oops, there seems to be an error loading the comments" + error
        })
      );
  }

  handleFetchComments(ids) {
    // Limit to 5 comments
    fetchComments(ids.slice(0, 5))
      .then(comments => comments.filter(comment => comment.text))
      .then(comments =>
        this.setState({
          comments: comments
        })
      );
  }

  render() {
    if (this.state.error) return this.state.error;
    if (!this.state.item) return <Loading />;

    return (
      <div className="item-detail">
        <NewsItem {...this.state.item}>
          {props => (
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: props.text }}
            />
          )}
        </NewsItem>

        {this.state.comments === 0 && "(No comments)"}

        {!!this.state.comments && (
          <div className="comments">
            {this.state.comments.map(comment => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default NewsDetail;
