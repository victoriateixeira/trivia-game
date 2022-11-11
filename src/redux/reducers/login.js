import { SAVE_EMAIL } from '../actions';

const initialState = {
  email: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_EMAIL: return {
    ...state,
    email: action.payload,
  };
  default:
    return state;
  }
};

export default login;
