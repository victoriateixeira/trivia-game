import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

import { actionCreator,
  getQuestions,
  SAVE_EMAIL,
  SAVE_SCORE,
  SAVE_TOKEN,
  START_TIMER } from '../redux/actions';
import Timer from '../components/Timer';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      buttonClicked: false,
      questionAnswers: [],
    };
  }

  async componentDidMount() {
    const { dispatch, history } = this.props;
    const questionsList = await dispatch(getQuestions());
    if (questionsList.length === 0) {
      localStorage.removeItem('token');
      dispatch(actionCreator(SAVE_TOKEN, ''));
      dispatch(actionCreator(SAVE_EMAIL, ''));
      history.push('/');
    }
    if (questionsList.length !== 0) {
      const allAnswers = [...questionsList[0].incorrect_answers,
        questionsList[0].correct_answer];
      const randomHelperNumb = 0.5;
      const shuffle = (arr) => [...arr].sort(() => Math.random() - randomHelperNumb);
      const random = shuffle(allAnswers);
      this.setState({
        questionAnswers: random,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { timer, questions } = this.props;
    const { index } = this.state;
    const ZERO_SECONDS = 0;
    // const THIRTY_SECONDS = 30;
    if (prevProps.timer !== timer && timer === ZERO_SECONDS) {
      this.setState({
        buttonClicked: true,
      });
    }
    if (prevState.index !== index) {
      const allAnswers = [...questions[index].incorrect_answers,
        questions[index].correct_answer];
      const randomHelperNumb = 0.5;
      const shuffle = (arr) => [...arr].sort(() => Math.random() - randomHelperNumb);
      const random = shuffle(allAnswers);
      this.setState({
        questionAnswers: random,
      });
    }
  }

  definesQuestionDifficulty = () => {
    const { questions } = this.props;
    const { index } = this.state;
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;

    const diff = questions[index].difficulty;
    if (diff === 'easy') {
      return EASY;
    } if (diff === 'medium') {
      return MEDIUM;
    }
    return HARD;
  };

  handleClick = ({ target }) => {
    const { dispatch, timer } = this.props;
    const NUMBER_TEN = 10;
    this.setState({ buttonClicked: true });
    const questionDiff = this.definesQuestionDifficulty();
    if (target.id === 'correct-answer') {
      dispatch(actionCreator(SAVE_SCORE, (NUMBER_TEN + timer * questionDiff)));
    }
  };

  handleClickNext = () => {
    const { index } = this.state;
    const { dispatch, history } = this.props;
    const THIRTY_SECONDS = 30;
    const four = 4;
    if (index === four) {
      history.push('/feedback');
    }
    this.setState({
      index: index + 1,
    });
    dispatch(actionCreator(START_TIMER, THIRTY_SECONDS));
    this.setState({
      buttonClicked: false,
    });
  };

  render() {
    const { questions, loading, history } = this.props;
    const { buttonClicked } = this.state;

    return (
      <>
        <div>
          <Header />
        </div>

        {!loading && <Timer />}

        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-play-again"
        >
          Play Again
        </button>

        {!loading
      && (
        questions.map((question, indexQuestion) => {
          // const allAnswers = [...question.incorrect_answers, question.correct_answer];
          // const randomHelperNumb = 0.5;
          // const shuffle = (arr) => [...arr].sort(() => Math.random() - randomHelperNumb);
          // const random = shuffle(allAnswers);
          const { index, questionAnswers } = this.state;
          if (indexQuestion === index && questionAnswers.length > 0) {
            return (
              <div key={ indexQuestion }>
                <div data-testid="question-category">
                  {question.category}
                </div>
                <div>
                  <div data-testid="question-text">
                    {question.question}
                  </div>
                  <div data-testid="answer-options">
                    {questionAnswers.map((ans, indexAnswer) => (
                      ans === question.correct_answer
                        ? (
                          <button
                            style={ {
                              border: buttonClicked ? '3px solid rgb(6, 240, 15)' : '',
                            } }
                            onClick={ this.handleClick }
                            type="button"
                            key={ indexAnswer }
                            data-testid="correct-answer"
                            id="correct-answer"
                            disabled={ buttonClicked }
                          >
                            {ans}
                          </button>
                        )
                        : (
                          <button
                            style={ {
                              border: buttonClicked ? '3px solid red' : '',
                            } }
                            onClick={ this.handleClick }
                            type="button"
                            key={ indexAnswer }
                            data-testid={ `wrong-answer-${indexAnswer}` }
                            id="wrong-answer"
                            disabled={ buttonClicked }
                          >
                            {ans}
                          </button>
                        )
                    ))}
                  </div>
                </div>
                <div>
                  {buttonClicked === true ? (
                    <button
                      data-testid="btn-next"
                      type="button"
                      onClick={ this.handleClickNext }
                    >
                      Next
                    </button>
                  ) : ''}
                </div>
              </div>
            );
          }
          return <div key={ indexQuestion } />;
        })
      )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  loading: state.game.loading,
  email: state.player.email,
  timer: state.game.timer,
  assertions: state.player.assertions,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf.isRequired,
  loading: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Game);
