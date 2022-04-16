const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const contractFile = require('../compileInbox');
const abi = contractFile.abi;
const bytecode = contractFile.evm.bytecode.object;

const INITIAL_STRING = 'Hi there!';
let accounts;
let inbox;

beforeEach(async () => {
	// Get a list of all accounts
	accounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy the contract
	// the contract
	inbox = await new web3.eth.Contract(abi)
		.deploy({
			data: bytecode,
			arguments: [INITIAL_STRING],
		})
		.send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
	it('deploys a contract', async () => {
		assert.ok(inbox.options.address);
	});

	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, INITIAL_STRING);
	});

	it('can change the message', async () => {
		const newMessage = 'Bye!';
		await inbox.methods.setMessage(newMessage).send({
			from: accounts[0],
			gas: '1000000',
		});
		const message = await inbox.methods.message().call();
		assert.equal(message, newMessage);
	});
});
