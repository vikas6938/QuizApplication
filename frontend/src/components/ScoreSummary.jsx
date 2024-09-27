import React from 'react';
import { useLocation } from 'react-router-dom';

const ScoreSummary = () => {
  const location = useLocation();
  const { score, totalQuestions } = location.state;

  const percentage = ((score / totalQuestions) * 100).toFixed(2);

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#457b9d', minHeight: '100vh' }}>
      <div className="container">
        <div className="text-center">
          <h1 className="display-4 text-light fw-bold">Quiz Completed!</h1>
          <p className="lead text-light">You have successfully finished the quiz.</p>
        </div>

        <div className="card shadow-lg mt-4 border-0 rounded-lg" style={{ backgroundColor: '#f1faee' }}>
          <div className="card-body text-center">
            <h2 className="text-primary">Your Score</h2>
            <p className="display-2 font-weight-bold text-dark">{score}/{totalQuestions}</p>
            <p className="h5 text-muted">You scored {percentage}% on this quiz.</p>
          </div>
        </div>

        <div className="mt-5 text-center">
          <a href="/" style={{ textDecoration: "none" }} className="btn btn-outline-light p-3 font-bold px-5 rounded-pill shadow-lg">
            Go to Quiz List
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScoreSummary;
