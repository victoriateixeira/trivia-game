import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { actionCreator, getQuestions, SAVE_EMAIL, SAVE_TOKEN } from '../redux/actions';
import './Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
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
  }

  handleClick = ({ target }, ans, correctAnswer) => {
    console.log(target);
    if (ans === correctAnswer) {
      target.classList = 'correct';
    } else {
      target.classList = 'wrong';
    }
  };

  render() {
    const { questions, loading } = this.props;

    return (
      <>
        <div>
          <Header />
        </div>
        {!loading
      && (
        questions.map((question, indexQuestion) => {
          const allAnswers = [...question.incorrect_answers, question.correct_answer];
          const randomHelperNumb = 0.5;
          const shuffle = (arr) => [...arr].sort(() => Math.random() - randomHelperNumb);
          const random = shuffle(allAnswers);
          const { index } = this.state;
          const correctAnswer = question.correct_answer;
          if (indexQuestion === index) {
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
                    {random.map((ans, indexAnswer) => (
                      <button
                        onClick={ (e) => this.handleClick(e, ans, correctAnswer) }
                        type="button"
                        key={ indexAnswer }
                        data-testid={ ans === correctAnswer
                          ? 'correct-answer' : `wrong-answer-${indexAnswer}` }
                      >
                        {ans}
                      </button>
                    ))}
                  </div>
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
  email: state.login.email,

});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps)(Game);
