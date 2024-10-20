const mongoose = require('mongoose');

// Book schema 
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  author: { type: String, required: true }, 
  totalCopies: { type: Number, required: true }, 
  borrowCount: { type: Number, default: 0 },
  copiesAvailable: { type: Number, required: true, default: 0 },

}, { timestamps: true }); 

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
