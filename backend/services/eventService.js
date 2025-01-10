const { ethers } = require('ethers');
const loanContract = require('../contracts/LoanContract.json');

const monitorLoanEvents = (contractAddress) => {
  const provider = new ethers.WebSocketProvider(process.env.BASE_RPC_URL);
  const contract = new ethers.Contract(contractAddress, loanContract.abi, provider);

  contract.on('LoanRepaid', (borrower, amount) => {
    console.log(`Loan repaid by ${borrower} for amount ${ethers.utils.formatEther(amount)}`);
    // Update database logic here
  });

  contract.on('CollateralReleased', (lender, amount) => {
    console.log(`Collateral released to lender ${lender} for amount ${ethers.utils.formatEther(amount)}`);
    // Update database logic here
  });
};

module.exports = { monitorLoanEvents };
