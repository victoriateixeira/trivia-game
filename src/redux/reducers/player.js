import { ADD_PLAYER_DATA, RESET_SCORE, SAVE_EMAIL, SAVE_SCORE } from '../actions';

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
      score: 0,

    };
  case SAVE_SCORE:
    return ({
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload,
    });
  case RESET_SCORE:
    return ({
      ...state,
      assertions: action.payload,
      score: action.payload,
    });
  default:
    return state;
  }
};

export default player;
