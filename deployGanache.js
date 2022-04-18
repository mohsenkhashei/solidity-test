const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const contractFile = require('./compileInbox');
const abi = contractFile.abi;
const bytecode = contractFile.evm.bytecode.object;

const provider = new HDWalletProvider(
	'0f93a68385e92dd8ff120fe7449b938acfda5ff97969c8333838ed8355b1b8b0',
	'HTTP://127.0.0.1:7545'
);
const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	// const accounts = await web3.eth.accounts.wallet;
	console.log(accounts);

	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(abi)
		.deploy({ data: bytecode, arguments: ['hi'] })
		.send({ gas: '1000000', from: accounts[0] });

	console.log('Contract deployed to', result.options.address);

	// for more info just checking balance of the 2 first accounts
	web3.eth.getBalance(accounts[0]).then((balance) => {
		console.log(`balance of account ${accounts[0]} : ${balance}`);
	});

	provider.engine.stop();
};
deploy();
