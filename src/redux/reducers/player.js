import { ADD_PLAYER_DATA, SAVE_EMAIL, SAVE_SCORE } from '../actions';

const initialState = {
  name: '',
  score: 0,
  gravatarEmail: '',
  assertions: 0,
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_EMAIL: return {
    ...state,
    email: action.payload,
  };

  case ADD_PLAYER_DATA:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,

    };
  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,

    };
  default:
    return state;
  }
};

export default player;
