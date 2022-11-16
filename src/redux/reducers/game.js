import {
  REQUEST_TOKEN,
  SAVE_QUESTIONS,
  SAVE_TOKEN,
  START_TIMER } from '../actions';

const initialState = {
  token: '',
  loading: false,
  questions: [],
  timer: 30,
};

const game = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_TOKEN: return {
    ...state,
    token: action.payload,
  };

  case REQUEST_TOKEN: return {
    ...state,
    loading: action.payload,
  };
  case SAVE_QUESTIONS: return {
    ...state,
    questions: action.payload,
  };
  case START_TIMER: return {
    ...state,
    timer: action.payload,
  };

  default:
    return state;
  }
};

export default game;
