const express = require('express');
const { getTransactionHistory } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get transaction history for the authenticated user
router.get('/', authMiddleware, getTransactionHistory);

module.exports = router;
