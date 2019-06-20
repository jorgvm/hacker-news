import React from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
//
import NewsItem from "./NewsItem";
import Loading from "./Loading";

class UserDetail extends React.Component {
  componentDidMount() {
    this.handleFetchUser();
  }

  handleFetchUser = () => {
    const username = this.props.match.params.id;
    const { userStore } = this.props.rootstore;

    // Get user from store
    userStore.getUser(username);
  };

  render() {
    const username = this.props.match.params.id;
    const { userStore, newsStore } = this.props.rootstore;
    const user = userStore.users[username];

    if (userStore.error) return userStore.error;
    if (!user || userStore.loading) return <Loading />;

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
          <h2>Last posts by {user.id}</h2>
          {newsStore.loading && <Loading />}
          {user.submitted &&
            !newsStore.loading &&
            user.submitted.map(id =>
              !newsStore.items[id] ? null : (
                <NewsItem key={id} {...newsStore.items[id]} />
              )
            )}
        </div>
      </>
    );
  }
}

export default inject("rootstore")(observer(UserDetail));
