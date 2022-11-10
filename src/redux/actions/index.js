export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const ADD_PLAYER_DATA = 'ADD_PLAYER_DATA';
export const actionCreator = (type, payload) => ({
  type,
  payload,
});

export function getToken() {
  return async (dispatch) => {
    dispatch(actionCreator(REQUEST_TOKEN, true));
    const url = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(url);
    const tokenData = await response.json();
    dispatch(actionCreator(SAVE_TOKEN, tokenData.token));
    dispatch(actionCreator(REQUEST_TOKEN, false));
    localStorage.setItem('token', tokenData.token);
  };
}

export function addPlayer(player) {
  return {
    type: ADD_PLAYER_DATA,
    player,
  };
}
