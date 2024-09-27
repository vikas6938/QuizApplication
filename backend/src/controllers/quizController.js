const Quiz = require('../models/quizModel');

// Fetch all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Fetch quiz by ID
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Submit quiz and calculate score
exports.submitQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const userAnswers = req.body.answers;
        let score = 0;

        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                score += 1;
            }
        });

        res.status(200).json({ score });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add error handling for invalid submissions in submitQuiz
exports.submitQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        const userAnswers = req.body.answers;
        if (!Array.isArray(userAnswers) || userAnswers.length !== quiz.questions.length) {
            return res.status(400).json({ error: 'Invalid number of answers' });
        }

        let score = 0;

        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                score += 1;
            }
        });

        res.status(200).json({ score });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
