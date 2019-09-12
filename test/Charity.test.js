const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCharity = require('../ethereum/build/Charity.json');

let charity; // A variable for creating an instance of our contract
let accounts;
let mangerAddress;


beforeEach(async() => {//deploy contract and get list of all of our accounts
	accounts = await web3.eth.getAccounts(); //getting all accounts
	charity = await new web3.eth.Contract(JSON.parse(compiledCharity.interface))
    .deploy(
			{ data: compiledCharity.bytecode , arguments: [web3.utils.toWei('0.1', 'ether')]})
    .send({ from: accounts[0], gas: "1000000" });

});

describe('Charity Contract', () => {
	it('deploys the contract successfully', () => {
		assert.ok(charity.options.address);
	});

	it('One account can contribute', async () => {
		await charity.methods.contribute().send({
			from: accounts[0],
			value: web3.utils.toWei('0.2', 'ether')
		});

		const contributers = await charity.methods.getContributers().call({from: accounts[0]});

		assert.equal(1, contributers.length);
	});

	it('Multiple accounts can contribute', async () => {
		await charity.methods.contribute().send({
			from: accounts[0],
			value: web3.utils.toWei('0.2', 'ether')
		});

		await charity.methods.contribute().send({
			from: accounts[1],
			value: web3.utils.toWei('0.2', 'ether')
		});

		await charity.methods.contribute().send({
			from: accounts[2],
			value: web3.utils.toWei('0.2', 'ether')
		});

		const contributers = await charity.methods.getContributers().call({from: accounts[0]});

		assert.equal(3, contributers.length);
	});

	it('Requires the minimum amount of ether', async () => {
		try{
		await charity.methods.contribute().send({
			from: accounts[0],
			value: 10
		});
		assert(false) //fail test entirely
	}catch (err){
		assert(err); //assert to check that error is present
	}

	});

});


//This test is for that when we call enter we get the reult that we wanted from the method
