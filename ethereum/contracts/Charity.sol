
pragma solidity ^0.4.17;
contract Charity {
    address public manager;
    address[] public contributers;
    struct CharityInfo{
        string name;
        address recipient;
    }
    CharityInfo[] public charityInfo;
    uint public contributersCount;
    uint public charitiesCount;

    function Charity () public {
        manager = msg.sender;
    }

    function contribute() public payable{
        require(msg.value >= 100);
        contributers.push(msg.sender);
        contributersCount++;
    }

    function random() private view returns(uint){
        return uint(keccak256(block.difficulty, now, contributers));
    }

    function createCharityInfo(string name, address recipient) public onlyManagerCanCall{
        CharityInfo memory newInfo = CharityInfo({
            name: name,
            recipient: recipient
        });
        charityInfo.push(newInfo);
        charitiesCount++;
    }

    function pickWinner(uint index) public onlyManagerCanCall{
        require(address(this).balance > 1000);
        CharityInfo storage charity = charityInfo[index];
        uint id = random() % contributers.length;
        contributers[id].transfer((address(this).balance)/2);
        charity.recipient.transfer((address(this).balance)/2);

    }

    function getContributers() public view returns(address[]){
      return contributers;
    }

    function getcharitiesCount() public view returns(uint){
      return charityInfo.length;
    }

    function getSummary() public view returns (uint, uint, address){
      return (
        this.balance,
        contributersCount,
        manager
      );
    }

    modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }

}
