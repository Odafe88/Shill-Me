const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  lender: { type: String, required: true }, // Wallet address of the lender
  borrower: { type: String },              // Wallet address of the borrower
  amount: { type: Number, required: true }, // Loan amount in ETH or token
  collateral: { type: Number, required: true }, // Collateral in ETH or token
  interestRate: { type: Number, required: true }, // Annual interest rate
  duration: { type: Number, required: true },    // Loan duration in days
  status: { type: String, default: 'pending' }, // 'pending', 'active', 'repaid'
}, { timestamps: true });

module.exports = mongoose.model('Loan', loanSchema);
