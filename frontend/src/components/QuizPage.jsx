import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, submitQuiz } from '../services/quizApi';

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Use the centralized API service to fetch a quiz by ID
    getQuizById(id)
      .then((data) => setQuiz(data))
      .catch((error) => console.error('Error fetching quiz:', error));
  }, [id]);

  const handleAnswerSelect = (answer) => {
    setAnswers([...answers, answer]);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitCurrentQuiz();
    }
  };

  const submitCurrentQuiz = () => {
    submitQuiz(id, answers)
      .then((result) => {
        navigate('/score-summary', {
          state: { score: result.score, totalQuestions: quiz.questions.length },
        });
      })
      .catch((error) => console.error('Error submitting quiz:', error));
  };

  if (!quiz) return <div>Loading...</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#457b9d', minHeight: '100vh' }}>
      <div className="container">
        <div className="text-center">
          <h1 className="display-4 text-light fw-bold">{quiz.title}</h1>
          <p className="lead text-light">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
        </div>

        <div className="card mt-5 shadow-lg border-0 rounded-lg" style={{ backgroundColor: '#f1faee' }}>
          <div className="card-body">
            <h5 className="card-title font-weight-bold">{currentQuestion.questionText}</h5>

            <ul className="list-group mt-3">
              {currentQuestion.answerChoices.map((choice, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action p-3 mb-2 text-start"
                  onClick={() => handleAnswerSelect(choice)}
                  style={{ cursor: 'pointer' }}
                >
                  {choice}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 text-center">
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <button
              className="btn btn-outline-light p-3 font-bold px-5 rounded-pill shadow-lg"
              onClick={() => handleAnswerSelect(currentQuestion.answerChoices[currentQuestionIndex])}
            >
              Next Question
            </button>
          ) : (
            <button
              className="btn btn-outline-light p-3 font-bold px-5 rounded-pill shadow-lg"
              onClick={submitCurrentQuiz}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
