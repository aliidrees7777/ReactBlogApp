import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import ListPost from "./components/ListPost.js";
import ViewPost from "./components/ViewPost.js";
import CreatePost from "./components/CreatePost.js";
import store from "./store";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route
            path="https://aliidrees7777.github.io/ReactBlogApp/"
            exact
            component={ListPost}
          />
          <Route path="/view/:postId" component={ViewPost} />
          <Route path="/add" component={CreatePost} />
          <Route path="/edit/:postId" component={CreatePost} />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
