require("dotenv").config("./.env");
const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
  )
);

function generateAccountObj() {
  const accountObj = web3.eth.accounts.create();
  return accountObj;
}

async function signAndVerify(accountObj, message) {
  console.log("Account obj : ", accountObj);
  const signatureObj = web3.eth.accounts.sign(message, accountObj.privateKey);
  console.log(signatureObj)
  const recoveredAddress = web3.eth.accounts.recover(signatureObj);
  return recoveredAddress == accountObj.address;
}

signAndVerify(generateAccountObj(), "Hello World!")
  .then(console.log)
  .catch(console.error);
