import {
  POST_COMMENT_FAILURE,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAILURE,
  RESET_POSTS
} from "../actions/actionTypes";

const initialState = { posts: [], comments: [], likesCount: 0 };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return state;
    case POST_COMMENT_SUCCESS:
      return { ...state, comments: [...state.comments, action.payload] };
    case POST_COMMENT_FAILURE:
      return { ...state, error: action.payload };

    case GET_COMMENT_REQUEST:
      return state;
    case GET_COMMENT_SUCCESS:
      return { ...state, comments: action.payload };
    case GET_COMMENT_FAILURE:
      return { ...state, error: action.payload };

    case DELETE_COMMENT_REQUEST:
      return state;
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [
          ...state.comments.filter(e => {
            return e.id !== action.payload.id;
          })
        ]
      };
    case DELETE_COMMENT_FAILURE:
      return { ...state, error: action.payload };

    case EDIT_COMMENT_REQUEST:
      return state;
    case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [
          ...state.comments.filter(e => {
            return e.id !== action.payload.id;
          }),
          action.payload
        ].sort((n, p) => p.id - n.id)
      };
    case EDIT_COMMENT_FAILURE:
      return { ...state, error: action.payload };

    case GET_POSTS_REQUEST:
      return state;
    case GET_POSTS_SUCCESS:
      return { ...state, posts: [...state.posts, ...action.payload] };
    case GET_POSTS_FAILURE:
      return { ...state, error: action.payload };

    case SEARCH_POSTS_REQUEST:
      return state;
    case SEARCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload };
    case SEARCH_POSTS_FAILURE:
      return { ...state, error: action.payload };

    case RESET_POSTS:
      return { ...state, posts: [] };

    default:
      return state;
  }
};

export default rootReducer;
