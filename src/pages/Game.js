import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import logo from '../trivia.png';
import { actionCreator, getQuestions, SAVE_EMAIL, SAVE_TOKEN } from '../redux/actions';
import Timer from '../components/Timer';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      isSelected: false,
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

  componentDidUpdate(_prevProps, prevState) {
    const { index } = this.state;
    if (prevState.index !== index) {
      this.handlesIsSelected();
    }
  }

  handlesAnswerSelection = (event) => {
    if (event.target.id === 'not-selected') {
      event.target.id = 'selected';
    } else {
      event.target.id = 'not-selected';
    }

    this.handlesIsSelected();
  };

  handlesIsSelected = () => {
    const answersParent = document.getElementById('answer-options');
    // event.target.parentElement;
    const answers = Array.from(answersParent.childNodes);
    console.log(answers);
    console.log(answers[0]);
    const selectionTrue = answers.some((answer) => answer.id === 'selected');
    console.log(selectionTrue);
    if (selectionTrue) {
      this.setState({
        isSelected: true,
      });
    } else {
      this.setState({
        isSelected: false,
      });
    }
  };

  handlesNextClick = () => {
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }));
    // this.handlesIsSelected();
  };

  render() {
    const { questions, loading } = this.props;
    const { isSelected } = this.state;

    return (
      <>
        <div>
          <Header />
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>GAME</p>
          </header>
          <div>
            <Timer />
          </div>
        </div>
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
                  <div
                    data-testid="answer-options"
                    id="answer-options"
                  >
                    {random.map((ans, indexAnswer) => (
                      <button
                        type="button"
                        key={ indexAnswer }
                        data-testid={ ans === question.correct_answer
                          ? 'correct-answer' : `wrong-answer-${indexAnswer}` }
                        id="not-selected"
                        onClick={ this.handlesAnswerSelection }
                      >
                        {ans}
                      </button>
                    ))}
                  </div>
                  {isSelected

                    && (
                      <button
                        type="button"
                        data-testid="btn-next"
                        onClick={ this.handlesNextClick }
                      >
                        Next

                      </button>
                    )}
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
