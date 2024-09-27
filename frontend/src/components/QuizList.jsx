import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllQuizzes } from '../services/quizApi';

const QuizList = () => {
  const customStyle = {
    fontFamily: "'Roboto', sans-serif",  // Change font family
    fontSize: '3em',                    // Change font size
    fontWeight: 'bold',                 // Change font weight
    color: '#ffffff',                   // Font color
  };

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Use the centralized API service to fetch quizzes
    getAllQuizzes()
      .then((data) => setQuizzes(data))
      .catch((error) => console.error('Error fetching quizzes:', error));
  }, []);

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#457b9d', minHeight: '100vh' }}>
      <div className="container">
        <h1 className="text-center mb-5" style={customStyle}>Available Quizzes</h1>
        <div className="row">
          {quizzes.length === 0 ? (
            <div className="col-12">
              <p className="text-center text-muted">No quizzes available at the moment. Please check back later.</p>
            </div>
          ) : (
            quizzes.map((quiz) => (
              <div className="col-md-6 col-lg-4 mb-4" key={quiz._id}>
                <div className="card h-100 shadow-lg border-0 rounded-lg" style={{ backgroundColor: '#f1faee' }}>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark">{quiz.title}</h5>
                    <p className="card-text text-muted">{quiz.description}</p>
                    <div className="mt-auto">
                      <Link
                        to={`/quiz/${quiz._id}`}
                        style={{ textDecoration: "none", color: '#558dd8', fontWeight:'bold'}}
                         className="btn btn-outline-light p-3 font-bold px-5 rounded-pill shadow-lg"
                      >
                        Start Quiz
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizList;
