#!/usr/bin/env node
const bigi = require('bigi');
const bitcoin = require('bitcoinjs-lib');
const getJSON = require('get-json');
const argv = require('minimist')(process.argv.slice(2));

const str = argv._.join(' ');

let hash = bitcoin.crypto.sha256(str);
let d = bigi.fromBuffer(hash);
let keyPair = new bitcoin.ECPair(d);

let address = keyPair.getAddress();

if(!argv.json) {
  console.log(`Address: ${address}, Key: ${keyPair.toWIF()}`);
}

getJSON(`https://blockchain.info/balance?active=${address}`, (err, res) => {
  if(err) { console.error(err); return;}
  let info = res[address];
  info.final_balance = fromSatoshis(info.final_balance);
  info.total_received = fromSatoshis(info.total_received);
  if(argv.json){
    info.address = address;
    info.wif = keyPair.toWIF();
    console.log(JSON.stringify(info, null, 2));
    return;
  }
  console.log(`Number of Transactions: ${info.n_tx}.`);
  console.log(`BTC Received: ${info.total_received}.`);
  console.log(`Final Balance: ${info.final_balance}.`);
});

function fromSatoshis(val) {
  return Number(val/100000000).toFixed(8);
}