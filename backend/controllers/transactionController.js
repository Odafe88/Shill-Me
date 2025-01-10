const Transaction = require('../models/transactionModel');

const getTransactionHistory = async (req, res) => {
  try {
    const { walletAddress } = req.user; // Authenticated user's wallet
    const transactions = await Transaction.find({ user: walletAddress });
    res.json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTransactionHistory };
