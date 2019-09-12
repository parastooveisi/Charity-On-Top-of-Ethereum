//we have to read the content of the file instead of require the .sol file

const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");


const buildPath = path.resolve(__dirname, "build"); //path
fs.removeSync(buildPath); //fs extra comes handy now too delete the entire folder in one command


const charityPath = path.resolve(__dirname, "contracts", "Charity.sol");
const source = fs.readFileSync(charityPath, "utf8"); //read

const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output){
  fs.outputJsonSync(
    path.resolve(buildPath, contract + '.json'),
    output[contract]
  );
}
//module.exports = solc.compile(source, 1).contracts[":Charity"]; //compile
// solc.compile(source, 1) --> solc.compile(source code, number of different contracts we are attempting to compile)
