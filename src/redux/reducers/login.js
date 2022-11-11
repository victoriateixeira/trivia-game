
import { SAVE_EMAIL } from '../actions';

import { ADD_PLAYER_DATA } from '../actions';


const initialState = {
  name: '',
  score: 0,
  email: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_EMAIL: return {
    ...state,
    email: action.payload,
  };

  case ADD_PLAYER_DATA:
    return {
      ...action.player,
    };
  default:
    return state;
  }
};

export default login;
