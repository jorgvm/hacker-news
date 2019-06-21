import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
var he = require("he");
//
import { stripHtmlTags } from "../utils/helpers";

function NewsItem(props) {
  const { children, by, id, title, time, url, text, kids, parent } = props;

  if (!text && !url) return null;

  const titleLimit = 60;
  const decoded = he.decode(text);
  const textSanitized = stripHtmlTags(decoded);

  return (
    <div className="news-item">
      <div className="title">
        {title && <Link to={`/item/${id}`}>{title}</Link>}
        {!title && parent && (
          <Link to={`/item/${parent}`}>
            (comment) {textSanitized.slice(0, titleLimit)}
            {textSanitized.length > titleLimit ? "..." : ""}
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
