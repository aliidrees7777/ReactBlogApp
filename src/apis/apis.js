import axios from "axios";
import { withRouter } from "react-router-dom";
import { API_ENDPOINT } from "../constants.js";

const apis = {
  postComment: payload => {
    return axios
      .post(`${API_ENDPOINT}posts/${payload.id}/comments`, payload)
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: "Unable to fetch Posts!" };
      });
  },

  getComments: payload => {
    return axios
      .get(
        `${API_ENDPOINT}posts/${payload}/comments?sortBy=createdAt&order=desc`
      )
      .then(res => {
        console.log(res);
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: "Unable to fetch Posts!" };
      });
  },

  deleteComments: payload => {
    return axios
      .delete(
        `${API_ENDPOINT}posts/${payload.id}/comments/${payload.commentId}`
      )
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: "Unable to fetch Posts!" };
      });
  },

  editComment: payload => {
    return axios
      .put(
        `${API_ENDPOINT}posts/${payload.id}/comments/${payload.commentId}`,
        payload
      )
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: "Unable to fetch Posts!" };
      });
  },

  getPost: payload => {
    return axios
      .get(`${API_ENDPOINT}posts${payload.postParams.params}`)
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: "Unable to fetch Posts!" };
      });
  },

  searchPost: payload => {
    return axios
      .get(`${API_ENDPOINT}posts${payload.params}`)
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        return { errorMessage: "Unable to fetch Posts!" };
      });
  }
};

export default withRouter(apis);
