"use strict";


const OSTBase    = require('@openstfoundation/openst-base');

const httpEndPoint = "http://127.0.0.1:8545",
      OstWeb3     = OSTBase.OstWeb3;

const web3Provider = new OstWeb3( httpEndPoint );
module.exports = web3Provider;

