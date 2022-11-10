import { REQUEST_TOKEN, SAVE_TOKEN } from '../actions';

const initialState = {
  token: '',
  loading: false,
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

  default:
    return state;
  }
};

export default game;
