import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import "./ViewPost.css";
import { API_ENDPOINT } from "../constants";
import Logo from "../images/nbslogo.png";
import LikePost from "./LikePost";
import CommentForm from "./CommentForm";
import { connect } from 'react-redux';
import { resetPosts } from "../actions/actions";

class ViewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      error: false,
      errorMessage: "",
      likes: []
    };
  }

  componentDidMount() {
    axios
      .get(`${API_ENDPOINT}posts/${this.props.match.params.postId}`)
      .then(response => {
        this.setState({
          post: response.data
        });
      })
      .catch(error => {
        this.setState({ error: true, errorMessage: "Unable to fetch Posts!" });
      });
      this.props.resetPosts();
  }

  render() {
    return (
      <div className="postPage">
        <div className="logo-nbs">
          <img src={Logo} alt="NBS logo" />
        </div>
        <div className="autumn-pic">
          <h1>{this.state.post.title}</h1>
        </div>
        <div className="paragraph">
          <p>{this.state.post.body}</p>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
          <LikePost />
          <CommentForm />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
      resetPosts: () => dispatch(resetPosts()),
    }
  }
export default connect(null, mapDispatchToProps)(withRouter(ViewPost));
