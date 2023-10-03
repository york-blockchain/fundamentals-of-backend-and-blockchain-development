require("dotenv").config("./.env");
const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
  )
);

async function transact() {
  const accountObj = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
  );
  const sender = accountObj.address;
  console.log(sender)
  const recipient = "0x678d24b693C9503De6385775CA9BCDa6383a9837";
  const senderNonce = await web3.eth.getTransactionCount(sender);
  const txObj = {
    nonce: senderNonce,
    to: recipient,
    from: sender,
    value: "0",
    gas: 30000,
  };
  const signTx = await accountObj.signTransaction(txObj);
  web3.eth
    .sendSignedTransaction(signTx.rawTransaction)
    .on("receipt", console.log);
}

transact().then(console.log).catch(console.error);
