# Bitcoin Address Checker

### Hashes a string, converts it to a BTC address (and key), and checks to see if that address contains any BTC.

## Installation
### Using Yarn:
`yarn global add bitcoin-address-checker`

### Using npm:
`npm i -g bitcoin-address-checker`

## Usage
`$ bitcoin-address-checker <string...> [--json]`

### Or...
`$ btccheck <string...> [--json]`

## Examples
### Checking a string for BTC.
`$ btccheck This is a string of text.`

```
Address: 12sRotJXv9y34n1suR85mcs86RrSx81W7m, Key: L2NiYzN8MVMzbd3NFLz64YdCmUGcLGUCjfsL92Qn6Uoybgdm6MQC  
Number of Transactions: 0.  
BTC Received: 0.  
Final Balance: 0.  
```

### Checking a string for BTC, returning raw JSON.
`$ btccheck This is a string of text. --json`
  
```json
{
  "final_balance": 0,
  "n_tx": 0,
  "total_received": 0,
  "address": "12sRotJXv9y34n1suR85mcs86RrSx81W7m",
  "wif": "L2NiYzN8MVMzbd3NFLz64YdCmUGcLGUCjfsL92Qn6Uoybgdm6MQC"
}
```

## License
```
Copyright 2017 Austin Peterson <austin@akpwebdesign.com> (https://blog.akpwebdesign.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```