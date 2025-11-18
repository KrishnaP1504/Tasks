import axios from 'axios';
import {
  FETCH_GAME_STATE_REQUEST,
  FETCH_GAME_STATE_SUCCESS,
  FETCH_GAME_STATE_FAILURE,
  UPDATE_SQUARE_REQUEST,
  UPDATE_SQUARE_SUCCESS,
  UPDATE_SQUARE_FAILURE,
} from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Fetch game state from server
export const fetchGameState = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_GAME_STATE_REQUEST });

    const response = await axios.get(`${API_URL}/game/state`);
    
    dispatch({
      type: FETCH_GAME_STATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GAME_STATE_FAILURE,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Update square color
export const updateSquare = (row, col) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SQUARE_REQUEST });

    const response = await axios.post(`${API_URL}/game/square`, {
      row,
      col,
    });

    dispatch({
      type: UPDATE_SQUARE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SQUARE_FAILURE,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Reset game (optional)
export const resetGame = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_GAME_STATE_REQUEST });

    const response = await axios.post(`${API_URL}/game/reset`);

    dispatch({
      type: FETCH_GAME_STATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GAME_STATE_FAILURE,
      payload: error.response?.data?.error || error.message,
    });
  }
};

