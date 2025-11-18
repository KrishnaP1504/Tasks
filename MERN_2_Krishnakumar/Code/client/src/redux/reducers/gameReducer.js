import {
  FETCH_GAME_STATE_REQUEST,
  FETCH_GAME_STATE_SUCCESS,
  FETCH_GAME_STATE_FAILURE,
  UPDATE_SQUARE_REQUEST,
  UPDATE_SQUARE_SUCCESS,
  UPDATE_SQUARE_FAILURE,
} from '../actions/types';

const initialState = {
  board: [],
  loading: false,
  error: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GAME_STATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_GAME_STATE_SUCCESS:
      return {
        ...state,
        loading: false,
        board: action.payload.board,
        error: null,
      };

    case FETCH_GAME_STATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_SQUARE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_SQUARE_SUCCESS:
      return {
        ...state,
        loading: false,
        board: action.payload.board,
        error: null,
      };

    case UPDATE_SQUARE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default gameReducer;

