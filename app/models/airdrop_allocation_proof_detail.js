"use strict";

const rootPrefix = '../..'
  , coreConstants = require(rootPrefix + '/config/core_constants')
  , QueryDBKlass = require(rootPrefix + '/app/models/queryDb')
  , ModelBaseKlass = require(rootPrefix + '/app/models/base')
  , responseHelper = require(rootPrefix + '/lib/formatter/response')
;

const dbName = coreConstants.MYSQL_DATABASE
  , QueryDBObj = new QueryDBKlass(dbName)
;

const AirdropAllocationProofDetailKlass = function () {};

AirdropAllocationProofDetailKlass.prototype = Object.create(ModelBaseKlass.prototype);

const AirdropAllocationProofDetailKlassPrototype = {

  QueryDB: QueryDBObj,

  tableName: 'airdrop_allocation_proof_details',

  getByTransactionHash: function (transaction_hash) {
    var oThis = this;
    return oThis.QueryDB.read(oThis.tableName, [], 'transaction_hash=?', transaction_hash);
  },

  createRecord: async function(transaction_hash, airdrop_amount, airdrop_allocated_amount=0) {
    var oThis = this;

    return new Promise(async function (onResolve, onReject) {
      try {
        const insertedRecord = await oThis.create({
          transaction_hash: transaction_hash,
          airdrop_amount: airdrop_amount,
          airdrop_allocated_amount: airdrop_allocated_amount
        });
        return onResolve(responseHelper.successWithData({response: insertedRecord}));
      } catch(err){
        return onResolve(responseHelper.error('l_aapd_cr_1', 'Error creating airdrop_allocation_proof_details record:'+err));
      }
    });

  },

  updateAllocatedAmount: async function(id, allocated_amount){
    var oThis = this;
    return new Promise(async function (onResolve, onReject) {
      var airdropAllocationProofDetailRecord = {}
      airdropAllocationProofDetailRecord['allocated_amount'] = allocated_amount;
      try {
        await oThis.edit(
          {
            qParams: airdropAllocationProofDetailRecord,
            whereCondition: {id: id}
          }
        );
      } catch(err){
        return onResolve(responseHelper.error('l_a_m_aapd_1', 'Something went wrong while updating record id:'+id));
      }

      return onResolve(responseHelper.successWithData({}));

    });
  },




};

Object.assign(AirdropAllocationProofDetailKlass.prototype, AirdropAllocationProofDetailKlassPrototype);

module.exports = AirdropAllocationProofDetailKlass;