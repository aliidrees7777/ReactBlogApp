import React from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resetPosts } from "../actions/actions";

import { API_ENDPOINT } from "../constants";
import Logo from "../images/nbslogo.png";
import plus from "../images/plus.jpg";
import "./CreatePost.css";

class CreatePost extends React.Component {
  is_Mounted = false;
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      tags: "",
      submitLoading: false,
      error: false,
      errorMessage: "",
      isEdit: false
    };
  }

  componentDidMount() {
    if (this.props.match.params.postId) {
      this.is_Mounted = true;
      this.setState({ isEdit: true });
      axios
        .get(`${API_ENDPOINT}posts/${this.props.match.params.postId}`)
        .then(res => {
          if (this.is_Mounted) {
            this.setState({
              title: res.data.title,
              body: res.data.body,
              tags: res.data.tags
            });
          }
        })
        .catch(error => {
          this.setState({
            error: true,
            errorMessage: "Unable to fetch Posts!"
          });
        });
    }
    this.props.resetPosts();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClick = e => {
    e.preventDefault();
    const { title, body, tags } = this.state;
    let apiRequest = null;
    if (this.props.match.params.postId) {
      apiRequest = axios.put(
        `${API_ENDPOINT}posts/${this.props.match.params.postId}`,
        { title, body, tags }
      );
    } else {
      apiRequest = axios.post(API_ENDPOINT + "posts/", { title, body, tags });
    }
    apiRequest
      .then(() => {
        this.props.history.push("/ReactBlogApp");
      })
      .catch(error => {
        this.setState({ error: "true", errorMessage: error.response });
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { title, body, tags, isEdit, submitLoading } = this.state;
    return (
      <div className="menu">
        <div className="logo-nbs">
          <img src={Logo} alt="NBS logo" />
        </div>
        <hr></hr>

        <div className="row">
          <div className="col-8">
            <div className="add-post">
              <h3 className="add-text">
                {isEdit ? "Edit Post" : "Add New Post"}
              </h3>
            </div>
          </div>
          <div className="col-4"></div>
        </div>

        <form action="" method="POST">
          <div className="row">
            <div className="col-8">
              <input
                type="text"
                className="title-blog"
                placeholder="Enter Title Here..."
                name="title"
                value={title}
                onChange={this.handleChange}
              ></input>
              <br />
              <input
                type="text"
                className="comment-section"
                placeholder="Enter body Here..."
                name="body"
                value={body}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="col-4">
              <div className="post-tag-blog">
                <h4>Post Tags</h4>
                <input
                  type="text"
                  className="post-tag-section"
                  name="tags"
                  value={tags}
                  onChange={this.handleChange}
                ></input>
                <img className="plus-pic" alt="" src={plus} />
                <h6 className="last-text">Separate Tags With Commas , </h6>
              </div>
              <button
                type="submit"
                className="btn btn-primary pb-btn"
                onClick={this.handleClick}
              >
                {isEdit
                  ? [submitLoading ? "Editing..." : "Edit"]
                  : [submitLoading ? "Publishing..." : "Publish"]}
              </button>
              <Link to="/ReactBlogApp">
                <button className="btn btn-outline-secondary pb-btn">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetPosts: () => dispatch(resetPosts())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(CreatePost));
