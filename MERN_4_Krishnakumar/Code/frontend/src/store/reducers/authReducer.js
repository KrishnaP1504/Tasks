import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGOUT,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  CLEAR_ERRORS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_START:
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

