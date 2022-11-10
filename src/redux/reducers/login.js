import { ADD_PLAYER_DATA } from '../actions';

const initialState = {
  name: '',
  score: 0,
  email: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
  case ADD_PLAYER_DATA:
    return {
      ...action.player,
    };
  default:
    return state;
  }
};

export default login;
