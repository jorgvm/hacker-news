import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
// import { FaExternalLinkAlt } from "react-icons/fa";
import _ from "underscore";

function NewsItem(props) {
  const { children, by, id, title, time, url, text, kids, parent } = props;

  if (!text && !url) return null;

  const textFormatted = _.unescape(text);

  return (
    <div className="news-item">
      <div className="title">
        {title && <Link to={`/item/${id}`}>{title}</Link>}
        {!title && parent && (
          <Link to={`/item/${parent}`}>
            (comment) {textFormatted.substring(0, 40)}
            {textFormatted.length > 20 ? "..." : ""}
          </Link>
        )}
      </div>

      {url && (
        <div className="link-out">
          <a href={url} target="_blank">
            Visit external link
          </a>
        </div>
      )}

      <div className="meta">
        by <Link to={`/user/${by}`}>{by}</Link>, {moment(time * 1000).fromNow()}
        <div>
          with{" "}
          {
            <Link to={`/item/${id}`}>
              {kids ? kids.length : 0}{" "}
              {kids && kids.length === 1 ? "comment" : "comments"}
            </Link>
          }
        </div>
      </div>

      {children && children(props)}
    </div>
  );
}

NewsItem.propTypes = {
  by: PropTypes.string.isRequired,
  url: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired
};

export default NewsItem;
