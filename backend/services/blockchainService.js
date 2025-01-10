const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const deployContract = async (compiledContract, constructorArgs) => {
  const factory = new ethers.ContractFactory(compiledContract.abi, compiledContract.bytecode, wallet);
  const contract = await factory.deploy(...constructorArgs);
  await contract.deployed();
  return contract.address;
};

const interactWithContract = async (contractAddress, abi, method, args) => {
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  return await contract[method](...args);
};

const repayLoan = async (contractAddress, amount) => {
    const contract = new ethers.Contract(contractAddress, loanContract.abi, wallet);
  
    const tx = await contract.repayLoan({ value: ethers.utils.parseEther(amount.toString()) });
    await tx.wait();
    console.log('Loan Repayment Completed:', tx.hash);
  
    return tx.hash;
  };
  

module.exports = { deployContract, interactWithContract };
