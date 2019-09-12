
pragma solidity ^0.4.17;
contract Charity {
    address public manager;
    address[] public contributers;
    address public charity;
    uint public  minimumContribution;
    uint public contributersCount;

    constructor(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function charityAddress() public{
        charity = msg.sender;
    }

    function contribute() public payable{
        require(msg.value > minimumContribution);
        contributers.push(msg.sender);
        contributersCount++;
    }

    function random() private view returns(uint){
        return uint(keccak256(block.difficulty, now, contributers));
    }

    function pickWinner() public onlyManagerCanCall{
        require(address(this).balance > .1 ether);
        uint index = random() % contributers.length;
        contributers[index].transfer((address(this).balance)/2);
        charity.transfer((address(this).balance)/2);

    }

    modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }

    function getContributers() public view returns(address[]){
      return contributers;
    }

}
