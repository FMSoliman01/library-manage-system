const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User schema 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
  role: { type: String, enum: ['admin', 'user'], default: 'user',},
  borrowingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BorrowingHistory' }], // Array of references to BorrowingHistory model
})

// hash password before saving to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
