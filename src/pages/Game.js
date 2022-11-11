import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreator, getQuestions, SAVE_EMAIL, SAVE_TOKEN } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const { dispatch, history } = this.props;
    const questionsList = dispatch(getQuestions());
    if (questionsList.length === 0) {
      localStorage.removeItem('token');
      dispatch(actionCreator(SAVE_TOKEN, ''));
      dispatch(actionCreator(SAVE_EMAIL, ''));
      history.push('/');
    }
  }

  render() {
    const { questions, loading } = this.props;

    return (

      !loading
      && (

        questions.map((question, indexQuestion) => {
          const allAnswers = [...question.incorrect_answers, question.correct_answer];
          const randomHelperNumb = 0.5;
          const shuffle = (arr) => [...arr].sort(() => Math.random() - randomHelperNumb);
          const random = shuffle(allAnswers);
          const { index } = this.state;
          if (indexQuestion === index) {
            return (

              <div key={ indexQuestion }>
                <div data-test-id="question-category">
                  {question.category}
                </div>
                <div>
                  <div data-test-id="question-text">
                    {question.question}

                  </div>
                  <div data-test-id="answer-options">
                    {random.map((ans, indexAnswer) => (
                      <button
                        type="button"
                        key={ indexAnswer }
                        data-test-id={ ans === question.correct_answer
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
      )
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
