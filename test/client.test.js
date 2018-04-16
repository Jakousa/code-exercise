const { expect, assert } = require('chai');
const { client } = require('../src/');

describe('#client', () => {

  let r;

  before(async () => {
    r = await client();
  });

  // I trust rethinkdb can test themselves. 

  after(async () => {
    await r.getPoolMaster().drain();
  });
});
