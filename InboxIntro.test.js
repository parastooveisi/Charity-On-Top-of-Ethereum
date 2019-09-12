const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //constructor function. We are using constructor to make an instance of web3
const web3 = new Web3(ganache.provider());//instance of web3


class Car{

	park(){
		return 'stopped';
	}

	drive(){
		return 'vroom';
	}
}

let car; //it's let because we change the variable. it cannot be const

beforeEach ( () => {
	car = new Car(); //global variable. accessible throughout all scopes
});

describe('Car', () => {
	it('has park function', () => {
		//test setup and assertion logic
		// We want to make sure that when call park() a string will be returned
		//new instance
		assert.equal(car.park(), 'stopped');
	}); //string can be anything. It's only for organization

	it('can drive', () => {
		assert.equal(car.drive(), 'vroom');
	});
}); //describe is used to group together certain test that are testing the same subject