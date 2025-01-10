const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
  user: { type: String, required: true }, // Wallet address
  type: { type: String, enum: ['repayment', 'collateral'], required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
