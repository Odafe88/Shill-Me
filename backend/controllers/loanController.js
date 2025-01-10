const Loan = require('../models/loanModel');
const { deployLoanContract } = require('../services/contractService');
const { repayLoan } = require('../services/blockchainService');

// Create a loan listing (lender)
const createLoanListing = async (req, res) => {
  try {
    if (req.user.role !== 'lender') {
      return res.status(403).json({ message: 'Only lenders can create loan listings.' });
    }

    const { amount, collateral, interestRate, duration } = req.body;

    const loan = await Loan.create({
      lender: req.user.walletAddress, // Use the authenticated user's wallet
      amount,
      collateral,
      interestRate,
      duration,
    });

    res.status(201).json({ success: true, loan });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// Fetch all loan listings
const getLoanListings = async (req, res) => {
  try {
    const loans = await Loan.find({ status: 'pending' }); // Only fetch unclaimed loans
    res.status(200).json({ success: true, loans });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Borrower accepts a loan
const acceptLoan = async (req, res) => {
    try {
      
      if (req.user.role !== 'borrower') {
        return res.status(403).json({ message: 'Only borrowers can accept loans.' });
      }
      const { loanId, borrower } = req.body;
      const loan = await Loan.findById(loanId);
      if (!loan) return res.status(404).json({ success: false, message: 'Loan not found' });
  
      if (loan.status !== 'pending') {
        return res.status(400).json({ success: false, message: 'Loan is not available' });
      }
  
      // Update loan status and borrower
      loan.borrower = borrower;
      loan.status = 'active';
      await loan.save();
  
      // Deploy the loan contract after acceptance
      const contractAddress = await deployLoanContract({
        lender: loan.lender,
        borrower: loan.borrower,
        amount: loan.amount,
        collateral: loan.collateral,
        interestRate: loan.interestRate,
        duration: loan.duration,
      });
  
      // Update the loan with contract address
      loan.contractAddress = contractAddress;
      await loan.save();
  
      res.status(200).json({ success: true, loan, contractAddress });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  


// // Deploy Loan Contract
// const deployLoan = async (req, res) => {
//   try {
//     const { loanId } = req.params;

//     const loan = await Loan.findById(loanId);
//     if (!loan) return res.status(404).json({ message: 'Loan not found' });

//     const contractAddress = await deployLoanContract({
//       lender: loan.lender,
//       borrower: loan.borrower,
//       amount: loan.amount,
//       collateral: loan.collateral,
//       interestRate: loan.interestRate,
//       duration: loan.duration,
//     });

//     loan.contractAddress = contractAddress;
//     loan.status = 'active';
//     await loan.save();

//     res.json({ success: true, contractAddress });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// Repay Loan
const repayLoanListing = async (req, res) => {
  try {
    const { loanId, amount } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    const txHash = await repayLoan(loan.contractAddress, amount);

    loan.status = 'repaid';
    await loan.save();

    res.json({ success: true, txHash });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = { createLoanListing, getLoanListings, acceptLoan, deployLoan, repayLoanListing };
