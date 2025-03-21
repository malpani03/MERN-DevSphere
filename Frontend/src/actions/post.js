import axios from "axios";
import { setAlert } from "./alert";
import { DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES,ADD_POST,GET_POST,ADD_COMMENT,REMOVE_COMMENT} from "./types";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/posts/");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    const errorResponse = err.response || {}; // Fallback to an empty object if err.response is undefined
    const errorMessage = errorResponse.statusText || "Network Error"; // Fallback message
    const errorStatus = errorResponse.status || 500; // Fallback status code

    dispatch({
      type: POST_ERROR,
      payload: { msg: errorMessage, status: errorStatus },
    });

    // Optionally, dispatch an alert for the user
    dispatch(setAlert(errorMessage, "danger"));
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    console.log('Sending POST request to backend with data:', formData);
    const res = await axios.post('http://localhost:5000/api/posts', formData, config);
    

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    console.error('Error occurred:', err);
    const errorMsg = err.response && err.response.statusText ? err.response.statusText : 'Server Error';
    const errorStatus = err.response && err.response.status ? err.response.status : 500;

    dispatch({
      type: POST_ERROR,
      payload: { msg: errorMsg, status: errorStatus }
    });
  }
};


// Get posts
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    const errorResponse = err.response || {}; // Fallback to an empty object if err.response is undefined
    const errorMessage = errorResponse.statusText || "Network Error"; // Fallback message
    const errorStatus = errorResponse.status || 500; // Fallback status code

    dispatch({
      type: POST_ERROR,
      payload: { msg: errorMessage, status: errorStatus },
    });

  }
};


// Add Comment
export const addComment = (postId,formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    console.log('Sending POST request to backend with data:', formData);
    const res = await axios.post(`http://localhost:5000/api/posts/comment/${postId}`, formData, config);
  

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    console.error('Error occurred:', err);
    const errorMsg = err.response && err.response.statusText ? err.response.statusText : 'Server Error';
    const errorStatus = err.response && err.response.status ? err.response.status : 500;

    dispatch({
      type: POST_ERROR,
      payload: { msg: errorMsg, status: errorStatus }
    });
  }
};

// // Delete Comment
// export const deleteComment = (postId,commentId) => async (dispatch) => {
//   try {
//     console.log('Sending POST request to backend with data:', formData);
//     const res = await axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`);
    
//     dispatch({
//       type: REMOVE_COMMENT,
//       payload: commentId
//     });

//     dispatch(setAlert('Comment Removed', 'success'));
//   } catch (err) {
//     console.error('Error occurred:', err);
//     const errorMsg = err.response && err.response.statusText ? err.response.statusText : 'Server Error';
//     const errorStatus = err.response && err.response.status ? err.response.status : 500;

//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: errorMsg, status: errorStatus }
//     });
//   }
// };

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


