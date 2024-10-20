const BorrowingHistory = require('../models/BorrowingHistory');
const Book = require('../models/Book');

// Get a report of borrowed books
exports.getCurrentlyBorrowedBooks = async (req, res) => {
  try {
    const borrowedRecords = await BorrowingHistory.find({ returnDate: null }).populate('book'); 
    const borrowedBooks = borrowedRecords.map(record => record.book); 

    res.status(200).json(borrowedBooks); 
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving borrowed books' });
  }
};

// Get a report for popular books
exports.getPopularBooks = async (req, res) => {
  try {
    const popularBooks = await Book.find()
      .sort({ borrowCount: -1 }) 
      .limit(10); 
    res.status(200).json(popularBooks); 
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving popular books' });
  }
};
