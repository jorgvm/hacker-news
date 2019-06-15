import React from "react";
import PropTypes from "prop-types";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import { fetchUser, fetchComments } from "../utils/api";

class UserDetail extends React.Component {
  state = {
    user: null,
    error: null,
    posts: null,
    postLimit: 10
  };

  componentDidMount() {
    const username = this.props.match.params.id;
    console.log(username);

    fetchUser(username)
      .then(({ data, error }) => {
        this.setState({
          user: data
        });

        if (data.submitted) {
          this.handleFetchItems(data.submitted);
        }
      })
      .catch(error =>
        this.setState({
          error:
            "Oops, there seems to be an error loading the user info" + error
        })
      );
  }

  handleFetchItems(ids) {
    fetchComments(ids.slice(0, this.state.postLimit)).then(posts =>
      this.setState({
        posts: posts
      })
    );
  }

  render() {
    const { posts, postLimit, error, user } = this.state;
    if (error) return error;
    if (!user) return <Loading />;

    return (
      <>
        <div className="user">
          <h1>{user.id}</h1>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: user.about }}
          />
          <div>Karma: {user.karma || "none"}</div>
        </div>
        <div className="user-posts">
          <h2>
            Last {postLimit} posts by {user.id}
          </h2>
          {!posts && <Loading />}
          {posts && posts.map(post => <NewsItem key={post.id} {...post} />)}
        </div>
      </>
    );
  }
}

export default UserDetail;
