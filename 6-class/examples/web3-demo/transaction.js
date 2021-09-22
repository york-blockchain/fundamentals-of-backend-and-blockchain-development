require("dotenv").config("./.env");
const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`
  )
);

async function transact() {
  const accountObj = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
  );
  const sender = accountObj.address;
  const recipient = "0x3e397B1B291B68C022ed20E725aFE21240994ACB";
  const senderNonce = await web3.eth.getTransactionCount(sender);
  const txObj = {
    nonce: senderNonce,
    to: recipient,
    from: sender,
    value: "787979445438",
    gas: 30000,
  };
  const signTx = await accountObj.signTransaction(txObj);
  web3.eth
    .sendSignedTransaction(signTx.rawTransaction)
    .on("receipt", console.log);
}

transact().then(console.log).catch(console.error);
