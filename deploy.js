const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const contractFile = require('./compileInbox');
const abi = contractFile.abi;
const bytecode = contractFile.evm.bytecode.object;

const provider = new HDWalletProvider(
	'pluck when exercise enforce random knee peace abstract survey during stay code',
	// remember to change this to your own phrase!
	'https://ropsten.infura.io/v3/71321b7af2f1470fa496a20659a7a18c'
	// remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	// const accounts = await web3.eth.accounts.wallet;
	console.log(accounts);

	console.log('Attempting to deploy from account', accounts[1]);

	const result = await new web3.eth.Contract(abi)
		.deploy({ data: bytecode, arguments: ['hi'] })
		.send({ gas: '1000000', from: accounts[1] });

	console.log('Contract deployed to', result.options.address);

// for more info just checking balance of the 2 first accounts
	web3.eth.getBalance(accounts[0]).then((balance) => {
		console.log('balance of accounts 0', balance);
	});

	web3.eth.getBalance(accounts[1]).then((balance1) => {
		console.log('balance of account 1 ', balance1);
	});
	provider.engine.stop();
};
deploy();
