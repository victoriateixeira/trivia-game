export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

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

export function getQuestions() {
  return async (dispatch) => {
    dispatch(actionCreator(REQUEST_TOKEN, true));
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const questionsData = await response.json();
    const questionsList = questionsData.results;
    dispatch(actionCreator(SAVE_QUESTIONS, questionsList));
    dispatch(actionCreator(REQUEST_TOKEN, false));
    return questionsList;
  };
}
