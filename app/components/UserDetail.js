import React from "react";
import PropTypes from "prop-types";
import dompurify from "dompurify";
import { connect } from "react-redux";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import { getUser } from "../actions/users";

class UserDetail extends React.Component {
  componentDidMount() {
    this.handleFetchUser();
  }

  handleFetchUser = () => {
    const username = this.props.match.params.id;
    const { users, dispatch } = this.props;

    // Get user from store
    dispatch(getUser({ username }));
  };

  render() {
    const { users, news } = this.props;
    const username = this.props.match.params.id;

    const user = users?.users?.[username];

    // Username not found
    if (user?.error) return "Sorry, this user does not seem to exist!";

    // Loading
    if (users.loading || (!users.error && !user)) return <Loading />;
    if (users.error) return users.error;

    return (
      <>
        <div className="user">
          <h1>{user.id}</h1>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: dompurify.sanitize(user.about) }}
          />
          <div>Karma: {user.karma || "none"}</div>
        </div>
        {news?.items && (
          <div className="user-posts">
            <h2>Last posts by {user.id}</h2>
            {news.loading && <Loading />}
            {user.submitted &&
              user.submitted.map(id =>
                !news.items[id] ? null : (
                  <NewsItem key={id} {...news.items[id]} />
                )
              )}
          </div>
        )}
      </>
    );
  }
}

function mapStateToProps({ users, news }) {
  return { users, news };
}

export default connect(mapStateToProps)(UserDetail);
