const mongoose = require('mongoose');

// Borrowing History schema 
const borrowingHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, 
  borrowDate: { type: Date, default: Date.now }, 
  returnDate: { type: Date } ,
  dueDate: { type: Date, required: true }
}, { timestamps: true }); 

const BorrowingHistory = mongoose.model('BorrowingHistory', borrowingHistorySchema);
module.exports = BorrowingHistory;
