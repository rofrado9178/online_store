import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCESS,
  USER_LOGIN_REQUEST,
  USER_LOG_OUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCESS,
  USER_REGISTER_REQUEST,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCESS,
  USER_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCESS,
  UPDATE_PROFILE_FAIL,
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

    case USER_LOG_OUT:
      return {};

    default:
      return state;
  }
};

export const userProfileReducers = (state = { profile: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true };

    case USER_PROFILE_SUCESS:
      return { loading: false, profile: action.payload };

    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOG_OUT:
      return {};

    default:
      return state;
  }
};

export const updateProfileReducers = (state = { profile: {} }, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };

    case UPDATE_PROFILE_SUCESS:
      return { loading: false, profile: action.payload };

    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOG_OUT:
      return {};

    default:
      return state;
  }
};
