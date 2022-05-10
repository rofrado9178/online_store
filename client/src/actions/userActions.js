import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCESS,
  USER_LOGIN_REQUEST,
  USER_LOG_OUT,
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
