const { expect, assert } = require('chai');
const { client, feed } = require('../src/');

describe('#feed', () => {

  let r;
  let s;

  before(async () => {
    r = await client();
    await r.tableCreate('test');
  });

  // NOTE: Simple example
  it('should return query changefeed observable', (done) => {

    // Create an observable changefeed from query
    s = feed(
      // Pass in any database query
      r.table('test').filter({ value: 'somevalue' })
    )
      // Subscribe to changes
      .subscribe(change => {
        // Example change object:
        // {
        //   type: 'update',
        //   prev: {<previous value>},
        //   next: {<new value>}
        // }
        expect(change.type).to.equal('insert');
        expect(change.next.value).to.equal('somevalue');
        // Will timeout if subscribe doesn't work properly
        done();
      });

    // Perform example insert
    setTimeout(async () => {
      await r.table('test').insert({ value: 'somevalue' });
    }, 100)
  });

  // TODO: Add test case for 'insert'
  //

  // TODO: Add test case for 'update'
  //

  // TODO: Add test case for 'delete'
  //

  // TODO: Add other test cases
  //

  after(async () => {
    if (s) {
      s.dispose();
    }
    await r.tableDrop('test');
    await r.getPoolMaster().drain();
  });
});
