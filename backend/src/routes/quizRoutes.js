const express = require('express');
const { getAllQuizzes, getQuizById, submitQuiz } = require('../controllers/quizController');

const router = express.Router();

router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);
router.post('/:id/submit', submitQuiz);

module.exports = router;
