import React from "react";
import { NavLink } from "react-router-dom";

function Nav(props) {
  return (
    <div class="header">
      <div>Hacker News feed by Jorg</div>
      <nav>
        <NavLink exact to="/" activeClassName="active">
          New
        </NavLink>
        <NavLink to="/top" activeClassName="active">
          Top
        </NavLink>
        <NavLink to="/ask" activeClassName="active">
          Ask
        </NavLink>
        <NavLink to="/about" activeClassName="active">
          About
        </NavLink>
      </nav>
    </div>
  );
}

export default Nav;
