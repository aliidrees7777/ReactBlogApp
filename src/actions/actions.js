import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_FAILURE,
  GET_COMMENT_REQUEST,
  GET_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_FAILURE,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_FAILURE,
  RESET_POSTS,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_FAILURE
} from "./actionTypes";

export const postCommentRequest = payload => ({
  type: POST_COMMENT_REQUEST,
  payload: payload
});
export const postCommentFailure = () => ({
  type: POST_COMMENT_FAILURE,
  payload: "Error Fetching data..!"
});

export const getCommentRequest = payload => ({
  type: GET_COMMENT_REQUEST,
  payload: payload
});
export const getCommentFailure = () => ({
  type: GET_COMMENT_FAILURE,
  payload: "Error Fetching data..!"
});

export const deleteCommentRequest = payload => ({
  type: DELETE_COMMENT_REQUEST,
  payload: payload
});
export const deleteCommentFailure = () => ({
  type: DELETE_COMMENT_FAILURE,
  payload: "Error Fetching data..!"
});

export const editCommentRequest = payload => ({
  type: EDIT_COMMENT_REQUEST,
  payload: payload
});
export const editCommentFailure = () => ({
  type: EDIT_COMMENT_FAILURE,
  payload: "Error Fetching data..!"
});

export const getPostsRequest = payload => ({
  type: GET_POSTS_REQUEST,
  payload: payload
});
export const getPostsFailure = error => ({
  type: GET_POSTS_FAILURE,
  payload: "Error Getting posts: "
});

export const resetPosts = () => ({ type: RESET_POSTS });

export const searchPostsRequest = payload => ({
  type: SEARCH_POSTS_REQUEST,
  payload: payload
});
export const searchPostsFailure = error => ({
  type: SEARCH_POSTS_FAILURE,
  payload: "Error Fetching Posts"
});
