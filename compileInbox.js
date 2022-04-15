const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(contractPath, 'utf8');

var input = {
	language: 'Solidity',
	sources: {
		'Inbox.sol': {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
};

var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
	'Inbox.sol'
]['Inbox'];
// fs.writeFileSync('./test/compile.json', JSON.stringify(output));

module.exports = output;
