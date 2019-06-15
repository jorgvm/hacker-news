import React from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter, Route } from "react-router-dom";
//
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";
import UserDetail from "./components/UserDetail";
import Nav from "./components/Nav";
import About from "./components/About";
import "./reset.scss";
import "./index.scss";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Nav />

        <div className="wrap">
          <Switch>
            <Route path="/" exact render={() => <NewsList type="new" />} />
            <Route path="/top" render={() => <NewsList type="top" />} />
            <Route path="/ask" render={() => <NewsList type="ask" />} />
            <Route path="/item/:id" component={NewsDetail} />
            <Route path="/user/:id" component={UserDetail} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
