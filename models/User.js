const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema definition
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
  role: { type: String, enum: ['admin', 'user'], default: 'user',},
  borrowingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BorrowingHistory' }], // Array of references to BorrowingHistory model
})

// Pre-save hook to hash password before saving to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords for login
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Create User model using the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
