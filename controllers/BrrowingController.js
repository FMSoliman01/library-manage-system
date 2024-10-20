const BorrowingHistory = require("../models/BorrowingHistory");
const Book = require("../models/Book");

exports.borrowBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book || book.copiesAvailable <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Set due date to 14 days from now
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const borrowingRecord = new BorrowingHistory({
      user: req.user.userId,
      book: id,
      borrowDate: Date.now(),
      dueDate: dueDate,
    });

    await borrowingRecord.save();
    book.copiesAvailable -= 1;
    book.borrowCount += 1;
    await book.save();

    res.status(201).json(borrowingRecord);
  } catch (err) {
    res.status(500).json({ message: "Error borrowing book" });
    console.error(err);
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { borrowingId } = req.params;
    const record = await BorrowingHistory.findById(borrowingId);

    if (!record || record.returnDate) {
      return res
        .status(400)
        .json({ message: "Invalid or already returned borrowing record" });
    }

    record.returnDate = Date.now();
    await record.save();

    const book = await Book.findById(record.book);
    book.copiesAvailable += 1;
    await book.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: "Error returning book" });
    console.error(err);
  }
};

exports.getUserBorrowingHistory = async (req, res) => {
  try {
    const { userId } = req.user;

    const borrowingRecords = await BorrowingHistory.find({ user: userId })
      .populate("book")
      .exec();

    if (!borrowingRecords || borrowingRecords.length === 0) {
      return res
        .status(404)
        .json({ message: "No borrowing history found for this user" });
    }

    res.json(borrowingRecords);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving borrowing history" });
    console.error(err);
  }
};
