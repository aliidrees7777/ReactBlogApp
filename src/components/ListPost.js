import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getPostsRequest,
  resetPosts,
  searchPostsRequest
} from "../actions/actions";

import { API_ENDPOINT } from "../constants";
import Logo from "../images/nbslogo.png";
import Pen from "../images/pen.png";
import "./ListPost.css";

class ListPost extends React.Component {
  constructor(props) {
    super(props);
    window.addEventListener("scroll", this.onScroll);
    this.state = {
      listPost: [],
      error: false,
      submitDeleting: false,
      errorMessage: "",
      page: 1,
      limit: 12,
      postCount: 500,
      order: "desc",
      createdAt: false,
      message: ""
    };
  }

  getPosts = () => {
    const { page, limit, order } = this.state;
    const postParams = {
      params: `?page=${page}&limit=${limit}&sortBy=createdAt&order=${order}`
    };
    this.props.getPostsRequest({ postParams });
  };

  componentDidMount() {
    this.props.resetPosts();
    this.getPosts();
  }

  onScroll = e => {
    const { page, postCount, limit } = this.state;
    const scrollTop = e.target.scrollingElement.scrollTop;
    if (scrollTop > page * 30) {
      this.setState({ page: postCount < limit ? page : page + 1 }, () => {
        this.getParamsObject();
      });
    }
  };

  getParamsObject = () => {
    const postParams = {
      params: this.getParams()
    };
    this.props.getPostsRequest({ postParams });
    this.setState({ postCount: this.props.posts.length });
  };

  getParams = () => {
    const { page, limit, order, createdAt } = this.state;
    if (createdAt) {
      return `?page=${page}&limit=${limit}&sortBy=createdAt&order=${order}`;
    } else {
      return `?page=${page}&limit=${limit}&sortBy=createdAt&order=${order}`;
    }
  };

  getMessage = () => {
    const { page, limit, order, message } = this.state;
    return `?page=${page}&limit=${limit}&sortBy=createdAt&order=${order}&search=${message}`;
  };

  onSearch = e => {
    this.setState(
      {
        message: e.target.value
      },
      () => {
        const searchParams = {
          params: this.getMessage()
        };
        this.props.searchPostsRequest(searchParams);
      }
    );
  };

  handleRowClick = postId => {
    this.props.history.push(`/ReactBlogApp/view/${postId}`);
  };

  handleAddClick = () => {
    this.props.history.push(`/ReactBlogApp/add`);
  };

  handleEditClick = postId => {
    this.props.history.push(`/ReactBlogApp/edit/${postId}`);
  };

  handleDeleteClick = postId => {
    axios
      .delete(`${API_ENDPOINT}posts/${postId}`)
      .then(res => {
        this.props.resetPosts();
      })
      .catch(error => {
        this.setState({
          error: true,
          errorMessage: "Unable to fetch data....!"
        });
      })
      .finally(() => {
        this.getPosts();
      });
  };

  render() {
    const postList = this.props.posts.map(post => {
      return (
        <tr key={post.id}>
          <td>
            <input type="checkbox" />
          </td>
          <td onClick={() => this.handleRowClick(post.id)}>{post.title}</td>
          <td>{post.tags}</td>
          <td>{post.createdAt}</td>
          <td>
            <button
              type="button"
              className="btn btn-default btn-sm"
              onClick={() => this.handleEditClick(post.id)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              type="button"
              className="btn btn-default btn-sm"
              onClick={() => this.handleDeleteClick(post.id)}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="menu">
        <div className="logo-nbs">
          <img src={Logo} alt="NBS logo" />
        </div>

        <div>
          <hr></hr>
          <div className="post-block">
            <img src={Pen} className="pen" alt="Pen Icon" />
            <h3>Posts</h3>
            <button
              className="add-button"
              onClick={() => this.handleAddClick()}
            >
              <span>Add New</span>
            </button>
            <div className="search-block">
              <div className="search-section">
                <input
                  type="message"
                  placeholder="Search.."
                  name="message"
                  onChange={this.onSearch}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="table">
          <table>
            <thead className="table-header">
              <tr>
                <th className="checkboxes">
                  <input type="checkbox" />
                </th>
                <th>Title</th>
                <th>Tags</th>
                <th>Date</th>
                <th></th>
              </tr>
              <tr></tr>
            </thead>
            <tbody>{postList}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    page: state.page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPostsRequest: postParams => dispatch(getPostsRequest(postParams)),
    resetPosts: () => dispatch(resetPosts()),
    searchPostsRequest: searchParams =>
      dispatch(searchPostsRequest(searchParams))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListPost));
