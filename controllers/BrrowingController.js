const BorrowingHistory = require('../models/BorrowingHistory');
const Book = require('../models/Book');

// Function to borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);

    if (!book || book.copiesAvailable <= 0) {
      return res.status(400).json({ message: 'Book not available' });
    }

    // Set due date to 14 days from now
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const borrowingRecord = new BorrowingHistory({
      user: req.user.accessToken.userId, 
      book: bookId,
      borrowDate: Date.now(),
      dueDate: dueDate
    });

    await borrowingRecord.save();
    book.copiesAvailable -= 1;
    book.borrowCount += 1;
    await book.save();

    res.status(201).json(borrowingRecord);
  } catch (err) {
    res.status(500).json({ message: 'Error borrowing book' });
    console.error(err);
  }
};

// Function to return a borrowed book
exports.returnBook = async (req, res) => {
  try {
    const { borrowingId } = req.body;
    const record = await BorrowingHistory.findById(borrowingId);

    if (!record || record.returnDate) {
      return res.status(400).json({ message: 'Invalid or already returned borrowing record' });
    }

    record.returnDate = Date.now();
    await record.save();

    const book = await Book.findById(record.book);
    book.copiesAvailable += 1;
    await book.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: 'Error returning book' });
    console.error(err);
  }
};
