"use strict";

const path = require('path')
  , rootPrefix = ".."
  , logger = require(rootPrefix + '/helpers/custom_console_logger')
;

/*
 * Constants file: Load constants from environment variables
 *
 */

function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true
  });
}
//Cache engine
const whitelistedCachineEngines = ['redis', 'none'];
if (whitelistedCachineEngines.indexOf(process.env.OST_CACHING_ENGINE) > -1) {
  define('CACHING_ENGINE', process.env.OST_CACHING_ENGINE);
} else {
  logger.error("Only "+whitelistedCachineEngines.toString()+" caching engines are supported");
  process.exit(0);
}

// Geth
define('OST_UTILITY_GETH_RPC_PROVIDER', process.env.OST_UTILITY_GETH_RPC_PROVIDER);
define('OST_UTILITY_GETH_WS_PROVIDER', process.env.OST_UTILITY_GETH_WS_PROVIDER);

// MySQL details
define("MYSQL_HOST", process.env.OP_MYSQL_HOST);
define("MYSQL_USER", process.env.OP_MYSQL_USER);
define("MYSQL_PASSWORD", process.env.OP_MYSQL_PASSWORD);
define("MYSQL_DATABASE", process.env.OP_MYSQL_DATABASE);
define("MYSQL_CONNECTION_POOL_SIZE", process.env.OP_MYSQL_CONNECTION_POOL_SIZE);


//Debug level
define('DEBUG_ENABLED', process.env.OST_DEBUG_ENABLED || false);
