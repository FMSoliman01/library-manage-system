const BorrowingHistory = require('../models/BorrowingHistory');
const Book = require('../models/Book');

// Get a report of currently borrowed books
exports.getCurrentlyBorrowedBooks = async (req, res) => {
  try {
    const borrowedRecords = await BorrowingHistory.find({ returnDate: null }).populate('book'); // Get borrowing records where books are not returned
    const borrowedBooks = borrowedRecords.map(record => record.book); // Extract the book details from the borrowing records

    res.status(200).json(borrowedBooks); // Return the borrowed books
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving borrowed books' });
  }
};

// Get a report of the most popular books
exports.getPopularBooks = async (req, res) => {
  try {
    const popularBooks = await Book.find()
      .sort({ borrowCount: -1 }) // Sort books by borrow count in descending order
      .limit(10); // Get the top 10 popular books

    res.status(200).json(popularBooks); // Return the popular books
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving popular books' });
  }
};
