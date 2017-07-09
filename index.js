const bigi = require('bigi');
const bitcoin = require('bitcoinjs-lib');
const request = require('request');
const Promise = require('bluebird');

function hashString(str) {
  return new Promise((resolve) => {
    return resolve(bitcoin.crypto.sha256(str));
  });
}

function generateKeyPair(hash, compressed) {
  return new Promise((resolve) => {
    let bigint = bigi.fromBuffer(hash);
    if(compressed === null || compressed === undefined) {
      compressed = false;
    }
    let keyPair = new bitcoin.ECPair(bigint, null, {compressed: compressed});
    return resolve(keyPair);
  });
}

function getAddressInfo(address) {
  return new Promise((resolve, reject) => {
    request({ url: `https://blockchain.info/balance?active=${address}`, json: true }, function (err, res, body) {
      if(err) {
        return reject({
          success: false,
          error: err
        });
      }
      if(res.statusCode != 200) {
        return reject({
          success: false,
          error: `blockchain.info returned an error: ${res.statusCode}.`
        });
      }
      let info = body[address];
      info.address = address;
      info.success = true;
      return resolve(info);
    });
  });
}

function getAddressInfoFromString(str, forceCompressed) {
  return hashString(str).then((hash) => {
    return generateKeyPair(hash, forceCompressed);
  }).then((keyPair) => {
    return getAddressInfo(keyPair.getAddress())
            .then((info) => {
              info.address = keyPair.getAddress();
              info.wif = keyPair.toWIF();
              return info;
            });
  });
}

module.exports = {
  hashString: hashString,
  generateKeyPair: generateKeyPair,
  getAddressInfo: getAddressInfo,
  getAddressInfoFromString: getAddressInfoFromString
};