import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizList from './components/QuizList';
import QuizPage from './components/QuizPage';
import ScoreSummary from './components/ScoreSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/score-summary" element={<ScoreSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
