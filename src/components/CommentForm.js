import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postCommentRequest,
  getCommentRequest,
  deleteCommentRequest,
  editCommentRequest
} from "../actions/actions";

import User from "../images/user.png";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      commentMsg: "",
      commentId: "",
      onEdit: false
    };
  }

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    this.props.getCommentRequest(this.props.match.params.postId);
  };

  onSubmit = e => {   
    const commentData = {
      name: "Alee Idrees",
      message: this.state.message,
      id: this.props.match.params.postId,
      createdAt: new Date()
    };
    this.setState({
      message: ""
    });
    this.props.postCommentRequest(commentData);
  };

  onEdit = () => {
    const editComment = {
      message: this.state.commentMsg,
      commentId: this.state.commentId,
      id: this.props.match.params.postId
    };
    this.props.editCommentRequest(editComment);
    this.setState({
      onEdit: false
    })
  };

  handleDeleteClick = commentsId => {
    const delComment = {
      id: this.props.match.params.postId,
      commentId: commentsId
    };
    this.props.deleteCommentRequest(delComment);
  };

  handleEditClick = comment => {
    this.setState({
      onEdit: true,
      commentId: comment.id,
      commentMsg: comment.message
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { message, onEdit, commentId } = this.state;
    const commentList = this.props.comments.map(comment => {
      return (
        <div key={comment.id}>
          <div className="clearfix"></div>
          <hr />
          <ul className="media-list">
            <li className="media">
              <img
                src={User}
                className="img-responsive image-circle"
                alt=""
                style={{ width: "10%" }}
              />
              <div className="media-body">
                <span className="text-muted pull-right">
                  <small className="text-muted">{comment.createdAt}</small>
                </span>
                <strong className="text-success">@{comment.name}</strong>
                <button
                  type="button"
                  className="btn btn-default btn-sm"
                  style={{ marginLeft: "20px" }}
                  onClick={() => this.handleEditClick(comment)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-default btn-sm"
                  style={{ marginLeft: "20px" }}
                  onClick={() => this.handleDeleteClick(comment.id)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                {onEdit && comment.id === commentId ? (
                  <div style={{ marginLeft: "10px" }}>
                    <input
                      name="commentMsg"
                      onChange={this.handleChange}
                      value={this.state.commentMsg}
                      type="text"
                      className="form-control"
                      style={{ width: "50%" }}
                    />

                    <button
                      type="button"
                      value="submit"
                      className="btn btn-info pull-right"
                      onClick={this.onEdit}
                      style={{ marginLeft: "10px" }}
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <p>{comment.message}</p>
                )}
              </div>
            </li>
          </ul>
        </div>
      );
    });
    return (
      <div>
        <div
          className="row bootstrap snippets"
          style={{ width: "70%", margin: "20px 40px" }}
        >
          <div className="col-md-10">
            <div className="comment-wrapper">
              <div
                className="panel panel-info"
                style={{ width: "90%", margin: "20px 40px" }}
              >
                <div className="panel-heading">Comment panel</div>
                <form>
                  <div className="panel-body">
                    <textarea
                      className="form-control"
                      placeholder="write a comment..."
                      rows="3"
                      onChange={this.handleChange}
                      name="message"
                      value={message}
                    ></textarea>
                    <br />
                    <button
                      type="button"
                      value="submit"
                      className="btn btn-info pull-right"
                      onClick={e => this.onSubmit(e)}
                    >
                      Post
                    </button>
                    {commentList}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postCommentRequest: commentsData =>
      dispatch(postCommentRequest(commentsData)),
    getCommentRequest: postId => dispatch(getCommentRequest(postId)),
    deleteCommentRequest: delComment =>
      dispatch(deleteCommentRequest(delComment)),
    editCommentRequest: editComment => dispatch(editCommentRequest(editComment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CommentForm));
