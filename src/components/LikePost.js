import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { API_ENDPOINT } from "../constants";

class LikePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: ""
    };
  }

  getLikes = () => {
    axios
      .get(`${API_ENDPOINT}posts/${this.props.match.params.postId}/likes`)
      .then(response => {
        this.setState({
          likes: response.data.length
        });
      })
      .catch(error => {
        this.setState({ error: true, errorMessage: "Unable to fetch Posts!" });
      });
  };

  saveUser = () => {
    let isLiked = localStorage.getItem(
      `liked${this.props.match.params.postId}`
    );
    if (isLiked) {
      this.setState({
        liked: isLiked
      });
    }
  };

  componentDidMount() {
    this.getLikes();
    this.saveUser();
  }

  handleLikeClick = () => {
    const { postId } = this.props.match.params;
    const { liked } = this.state;
    localStorage.setItem(`liked${postId}`, !liked);
    this.setState({
      liked: !liked
    });
    let apiRequest = null;
    if (!liked) {
      apiRequest = axios
        .post(`${API_ENDPOINT}posts/${postId}/likes`)
        .then(response => {
          localStorage.setItem(`post${postId}`, response.data.id);
          this.setState({
            likes: response.data.length
          });
          this.getLikes();
        })
        .catch(error => {
          this.setState({
            error: true,
            errorMessage: "Unable to fetch posts!"
          });
        });
    } else {
      apiRequest = axios
        .delete(
          `${API_ENDPOINT}posts/${postId}/likes/${localStorage.getItem(
            `post${postId}`
          )}`
        )
        .then(response => {
          localStorage.removeItem(`post${postId}`);
          localStorage.removeItem(`liked${postId}`);
          this.getLikes();
        })
        .catch(error => {
          this.setState({
            error: true,
            errorMessage: "Unable to fetch posts!"
          });
        });
    }
  };

  render() {
    const { liked } = this.state;
    return (
      <div className="like" style={{ margin: "10px 40px" }}>
        {liked ? (
          <button
            type="button"
            className="btn btn-success"
            style={{ fontSize: "40px" }}
            onClick={this.handleLikeClick}
          >
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            {this.state.likes}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-light"
            style={{ fontSize: "40px" }}
            onClick={this.handleLikeClick}
          >
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            {this.state.likes}
          </button>
        )}
      </div>
    );
  }
}

export default withRouter(LikePost);
