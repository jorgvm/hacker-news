import React from "react";
import ReactDOM from "react-dom";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "mobx-react";
//
import NewsList from "./components/NewsList";
// import NewsDetail from "./components/NewsDetail";
// import UserDetail from "./components/UserDetail";
import Nav from "./components/Nav";
import About from "./components/About";
import RootStore from "./stores/RootStore";
// import NewsStore from "./stores/News";
// import NewsLists from "./stores/NewsLists";
import "./reset.scss";
import "./index.scss";

class App extends React.Component {
  render() {
    // <Route path="/item/:id" component={NewsDetail} />
    // <Route path="/user/:id" component={UserDetail} />
    return (
      <Provider rootstore={RootStore}>
        <BrowserRouter>
          <Nav />

          <div className="wrap">
            <Switch>
              <Route path="/" exact render={() => <NewsList type="new" />} />
              <Route path="/top" render={() => <NewsList type="top" />} />
              <Route path="/ask" render={() => <NewsList type="ask" />} />

              <Route path="/about" component={About} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
