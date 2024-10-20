const mongoose = require('mongoose');

// Borrowing History schema definition
const borrowingHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // Reference to Book model
  borrowDate: { type: Date, default: Date.now }, // Borrow date with default value
  returnDate: { type: Date } ,// Return date (optional)
  dueDate: { type: Date, required: true }
}, { timestamps: true }); // Automatically track createdAt and updatedAt

// Create BorrowingHistory model using the schema
const BorrowingHistory = mongoose.model('BorrowingHistory', borrowingHistorySchema);
module.exports = BorrowingHistory;
