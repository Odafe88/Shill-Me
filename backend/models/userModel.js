const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletAddress: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['borrower', 'lender'], 
    required: true 
  },
}, { timestamps: true });

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   walletAddress: { type: String, required: true, unique: true },
//   role: { 
//     type: String, 
//     enum: ['borrower', 'lender'], 
//     required: true 
//   }, // Role determines the user type
//   createdAt: { type: Date, default: Date.now },
// });

module.exports = mongoose.model('User', userSchema);
