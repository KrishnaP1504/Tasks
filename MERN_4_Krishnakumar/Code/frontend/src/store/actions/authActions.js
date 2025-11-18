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
} from './types';
import api from '../../services/api';
import setAuthToken from '../../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  if (!localStorage.token) {
    return;
  }

  setAuthToken(localStorage.token);
  dispatch({ type: USER_LOADING });

  try {
    const res = await api.get('/auth/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    // Only dispatch error if it's not a connection error
    if (err.code !== 'ERR_NETWORK' && err.code !== 'ECONNREFUSED') {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response?.data?.message || 'Authentication failed',
      });
    } else {
      // For connection errors, just clear the token silently
      localStorage.removeItem('token');
      dispatch({
        type: AUTH_ERROR,
        payload: null,
      });
    }
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  dispatch({ type: REGISTER_START });

  try {
    const res = await api.post('/auth/register', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response?.data?.message || 'Registration failed',
    });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN_START });

  try {
    const res = await api.post('/auth/login', formData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data?.message || 'Login failed',
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

