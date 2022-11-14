import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { actionCreator, getQuestions, SAVE_EMAIL, SAVE_TOKEN } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      buttonClicked: false,
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

  handleClick = () => {
    this.setState({ buttonClicked: true });
  };

  handleClickNext = () => {
    const { index } = this.state;
    this.setState({
      index: index + 1,
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
          const allAnswers = [...question.incorrect_answers, question.correct_answer];
          const randomHelperNumb = 0.5;
          const shuffle = (arr) => [...arr].sort(() => Math.random() - randomHelperNumb);
          const random = shuffle(allAnswers);
          const { index } = this.state;
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
