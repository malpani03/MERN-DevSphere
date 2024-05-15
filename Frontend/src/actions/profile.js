import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from "./types";

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Get all Profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({type:CLEAR_PROFILE})
  try {
    const res = await axios.get("http://localhost:5000/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Profile By ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Create or update profile
export const createProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/profile",
        formData
      );

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      } else if (err.response && err.response.status) {
        dispatch(
          setAlert(
            `${err.response.status}: ${err.response.statusText}`,
            "danger"
          )
        );
      } else {
        console.error("Error:", err);
        dispatch(setAlert("An error occurred", "danger"));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response ? err.response.statusText : "Unknown error",
          status: err.response ? err.response.status : "Unknown status",
        },
      });
    }
  };

// Add Experience
export const addExperience = (formData) => async (dispatch) => {
  try {
    const res = await axios.put(
      "http://localhost:5000/api/profile/experience",
      formData
    );
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Experience Added", "success"));
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Unknown error",
        status: err.response ? err.response.status : "Unknown status",
      },
    });
  }
};

// Add Experience
export const addEducation = (formData) => async (dispatch) => {
  try {
    const res = await axios.put(
      "http://localhost:5000/api/profile/education",
      formData
    );
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Education Added", "success"));
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Unknown error",
        status: err.response ? err.response.status : "Unknown status",
      },
    });
  }
};

//Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/profile/experience/${id}`
    );
    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(setAlert("Experience Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Unknown error",
        status: err.response ? err.response.status : "Unknown status",
      },
    });
  }
};

//Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/profile/education/${id}`
    );
    dispatch({ type: UPDATE_PROFILE, payload: res.data });

    dispatch(setAlert("Education Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Unknown error",
        status: err.response ? err.response.status : "Unknown status",
      },
    });
  }
};

//DELETE PROFILE
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete('http://localhost:5000/api/profile');

      if (res.status !== 200) {
        throw new Error(`Server returned status code ${res.status}`);
      }

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      console.error(err);
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response ? err.response.statusText : "Unknown error",
          status: err.response ? err.response.status : "Unknown status",
        },
      });
    }
  }
};
