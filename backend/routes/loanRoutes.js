const express = require('express');
const { createLoanListing, getLoanListings, acceptLoan, repayLoanListing } = require('../controllers/loanController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Create a Loan Listing
router.post('/create-loan', authMiddleware, roleMiddleware(['lender']), createLoanListing);

// Get All Loan Listings
router.get('/', getLoanListings);

// Accept a Loan
router.put('/:loanId/accept', authMiddleware, acceptLoan);

// Repay
router.post('/:loanId/repay', authMiddleware, repayLoanListing);

module.exports = router;

// const express = require('express');
// const { createLoanListing, acceptLoan } = require('../controllers/loanController');
// const authMiddleware = require('../middleware/authMiddleware');
// const roleMiddleware = require('../middleware/roleMiddleware');

// const router = express.Router();

// // Lender creates a loan listing
// router.post('/', authMiddleware, roleMiddleware(['lender']), createLoanListing);

// // Borrower accepts a loan
// router.put('/accept', authMiddleware, roleMiddleware(['borrower']), acceptLoan);

// module.exports = router;
