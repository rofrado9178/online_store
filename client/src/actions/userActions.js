import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCESS,
  USER_LOGIN_REQUEST,
  USER_LOG_OUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCESS,
  USER_REGISTER_FAIL,
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

export const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: USER_LOG_OUT });
};
