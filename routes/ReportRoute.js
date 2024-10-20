const express = require('express');
const verifyToken= require ("../middlewares/verifyToken")



const {
  getCurrentlyBorrowedBooks,
  getPopularBooks
} = require('../controllers/ReportsController');

const router = express.Router();

// Route to get currently borrowed books
router.get('/borrowed',verifyToken, getCurrentlyBorrowedBooks);

// Route to get popular books
router.get('/popular',verifyToken, getPopularBooks);

module.exports = router;
