import React from "react";
import { NavLink } from "react-router-dom";

function Nav(props) {
  return (
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
  );
}

export default Nav;
