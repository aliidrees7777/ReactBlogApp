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
          <Route path="/ReactBlogApp" exact component={ListPost} />
          <Route path="/ReactBlogApp/view/:postId" component={ViewPost} />
          <Route path="/ReactBlogApp/add" component={CreatePost} />
          <Route path="/ReactBlogApp/edit/:postId" component={CreatePost} />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
