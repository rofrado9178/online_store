import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCESS,
  USER_LOGIN_REQUEST,
  USER_LOG_OUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCESS,
  USER_REGISTER_REQUEST,
} from "../constants/userConstants";

export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCESS:
      return { loading: false, user: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOG_OUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCESS:
      return { loading: false, user: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
