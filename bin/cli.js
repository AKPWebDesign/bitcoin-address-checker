#!/usr/bin/env node
const getInfo = require('../index.js').getAddressInfoFromString;
const argv = require('minimist')(process.argv.slice(2));
let str = '';

if(argv.stdin) {
  let stdin = process.openStdin();
  stdin.on('data', (c) => {str += c});
  stdin.on('end', () => {
    // strip off final newline. todo: make this more robust?
    if(str.endsWith('\r\n')) {
      str = str.slice(0, -2);
    }
    doWork(str);
  });
} else {
  str = argv._.join(' ');
  doWork(str);
}

function doWork(str) {
  return getInfo(str).then((info) => {
    if(argv.json) {
      return console.log(JSON.stringify(info, null, 2));
    }
    console.log(`Address: ${info.address}`);
    console.log(`WIF: ${info.wif}`);
    console.log(`Number of Transactions: ${info.n_tx}`);
    console.log(`BTC Received: ${fromSatoshis(info.total_received)}`);
    console.log(`Final Balance: ${fromSatoshis(info.final_balance)}`);
  }, (err) => {
    if(argv.json) {
      return console.log(JSON.stringify({
        success: false,
        error: err
      }, null, 2));
    }
    return console.error(err);
  });
}

function fromSatoshis(val) {
  return Number(val/100000000).toFixed(8);
}