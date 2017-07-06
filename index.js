#!/usr/bin/env node
const bigi = require('bigi');
const bitcoin = require('bitcoinjs-lib');
const getJSON = require('get-json');
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
  let hash = bitcoin.crypto.sha256(str);
  let d = bigi.fromBuffer(hash);
  let keyPair = new bitcoin.ECPair(d);

  let address = keyPair.getAddress();

  getJSON(`https://blockchain.info/balance?active=${address}`, (err, res) => {
    if(err) {
      if(argv.json) {
        return console.log(JSON.stringify({
          success: false,
          error: err
        }, null, 2));
      }
      return console.error(err);
    }
    let info = res[address];
    if(argv.json){
      info.address = address;
      info.wif = keyPair.toWIF();
      info.success = true;
      return console.log(JSON.stringify(info, null, 2));
    }
    console.log(`Address: ${address}`);
    console.log(`WIF: ${keyPair.toWIF()}`);
    console.log(`Number of Transactions: ${info.n_tx}`);
    console.log(`BTC Received: ${fromSatoshis(info.total_received)}`);
    console.log(`Final Balance: ${fromSatoshis(info.final_balance)}`);
  });
}

function fromSatoshis(val) {
  return Number(val/100000000).toFixed(8);
}