import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCESS,
  USER_LOGIN_REQUEST,
  USER_LOG_OUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCESS,
  USER_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCESS,
  UPDATE_PROFILE_FAIL,
} from "../constants/userConstants";
import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "api/users/login/",
      {
        "username": email,
        "password": password,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCESS,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const registerUser =
  (first_name, last_name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "api/users/register",
        {
          "first_name": first_name,
          "last_name": last_name,
          "email": email,
          "password": password,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const userProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: USER_PROFILE_SUCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateProfile =
  (first_name, last_name, email, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_REQUEST,
      });

      const {
        userLogin: { user },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/profile/update`,
        {
          "first_name": first_name,
          "last_name": last_name,
          "email": email,
          "password": password,
        },
        config
      );

      dispatch({ type: UPDATE_PROFILE_SUCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCESS, payload: data });
      dispatch({ type: USER_PROFILE_SUCESS, payload: data });
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: USER_LOG_OUT });
};
