const express = require('express');
const verifyToken= require ("../middlewares/verifyToken")



const {
  borrowBook,
  returnBook,
  getUserBorrowingHistory,
} = require('../controllers/BrrowingController');
//const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to borrow a book
router.post('/borrow',verifyToken,  borrowBook);

// Route to return a book
router.post('/return',verifyToken,  returnBook);

// // Route to get the borrowing history of the authenticated user
 router.get('/history',verifyToken, getUserBorrowingHistory);

module.exports = router;
