// src/services/quizApi.js
const API_BASE_URL = 'https://quizapplication-awta.onrender.com/api/quizzes';

// Fetch the list of all quizzes
export const getAllQuizzes = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch quizzes');
    }
    const quizzes = await response.json();
    return quizzes;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
};

// Fetch a single quiz by ID
export const getQuizById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch quiz with id ${id}`);
    }
    const quiz = await response.json();
    return quiz;
  } catch (error) {
    console.error(`Error fetching quiz with id ${id}:`, error);
    throw error;
  }
};

// Submit the quiz answers
export const submitQuiz = async (id, answers) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    });
    if (!response.ok) {
      throw new Error('Failed to submit quiz');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting quiz:', error);
    throw error;
  }
};
