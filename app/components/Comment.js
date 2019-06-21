import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dompurify from "dompurify";

function Comment({ by, deleted, text, id, time }) {
  if (!by || !text) return null;

  return (
    <div className="comment">
      <div className="meta">
        by <Link to={`/user/${by}`}>{by}</Link>, {moment(time * 1000).fromNow()}
      </div>
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: dompurify.sanitize(text) }}
      />
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  by: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
};

export default Comment;
