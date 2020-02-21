import { takeEvery, put, call, all } from "redux-saga/effects";
import {
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  POST_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
  GET_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  EDIT_COMMENT_REQUEST,
  GET_POSTS_SUCCESS,
  SEARCH_POSTS_FAILURE,
  SEARCH_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  SEARCH_POSTS_REQUEST
} from "../actions/actionTypes";
import apis from "../apis/apis";

export function* postCommentSaga(payload) {
  try {
    const { data } = yield call(apis.postComment, payload.payload);
    yield put({ type: POST_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: POST_COMMENT_FAILURE, payload: error });
  }
}

export function* getCommentSaga(payload) {
  try {
    const { data } = yield call(apis.getComments, payload.payload);
    yield put({ type: GET_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: GET_COMMENT_FAILURE, payload: error });
  }
}

export function* deleteCommentSaga(payload) {
  try {
    const { data } = yield call(apis.deleteComments, payload.payload);
    yield put({ type: DELETE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: DELETE_COMMENT_FAILURE, payload: error });
  }
}

export function* getPostsSaga(payload) {
  try {
    const { data } = yield call(apis.getPost, payload.payload);
    yield put({ type: GET_POSTS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: GET_POSTS_FAILURE, payload: error });
  }
}

export function* searchPostSaga(payload) {
  try {
    const { data } = yield call(apis.searchPost, payload.payload);
    yield put({ type: SEARCH_POSTS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: SEARCH_POSTS_FAILURE, payload: error });
  }
}

export function* editCommentSaga(payload) {
  try {
    const { data } = yield call(apis.editComment, payload.payload);
    yield put({ type: EDIT_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: EDIT_COMMENT_FAILURE, payload: error });
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(POST_COMMENT_REQUEST, postCommentSaga),
    takeEvery(GET_COMMENT_REQUEST, getCommentSaga),
    takeEvery(DELETE_COMMENT_REQUEST, deleteCommentSaga),
    takeEvery(EDIT_COMMENT_REQUEST, editCommentSaga),
    takeEvery(GET_POSTS_REQUEST, getPostsSaga),
    takeEvery(SEARCH_POSTS_REQUEST, searchPostSaga)
  ]);
}
