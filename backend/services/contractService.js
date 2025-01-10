const { deployContract } = require('./blockchainService');
const loanContract = require('../contracts/LoanContract.json'); // Compiled ABI and bytecode

const deployLoanContract = async (loanDetails) => {
  const { lender, borrower, amount, collateral, interestRate, duration } = loanDetails;

  const args = [
    lender,
    borrower,
    ethers.utils.parseEther(amount.toString()),
    ethers.utils.parseEther(collateral.toString()),
    interestRate,
    duration,
  ];

  const contractAddress = await deployContract(loanContract, args);
  console.log('Loan Contract Deployed at:', contractAddress);

  return contractAddress;
};

module.exports = { deployLoanContract };
