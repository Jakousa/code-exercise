const { expect, assert } = require('chai');
const { client, feed } = require('../src/');

describe('#feed', () => {

  let r;

  before(async () => {
    r = await client();
    await r.tableCreate('test');
  });

  it('should return valid observable and have it return insert to subscribed', async () => {
    const value = `${(new Date()).valueOf()}`
    let s;
    // Promise to keep track when test is done
    const test = new Promise((resolve, reject) => {
      s = feed(r.table('test').filter({ value }))
        .subscribe(change => {
          expect(change.type).to.equal('insert')
          expect(change.next.value).to.equal(value)
          expect(change.prev).to.equal(null)
          resolve()
        })
    })
    setTimeout(async () => {
      await r.table('test').insert({ value })
    }, 30)
    await test
    s.dispose()
  })

  it('should return valid observable and have it return update to subscribed', async () => {
    const value = `foo${Math.random() * 1000}`
    const value2 = `bar${Math.random() * 1000}`
    let s
    // Promise to keep track when test is done
    const test = new Promise((resolve, reject) => {
      s = feed(r.table('test'))
        .filter(change => change.type === 'update')
        .subscribe(change => {
          expect(change.type).to.equal('update')
          expect(change.next.value).to.equal(value2)
          expect(change.prev.value).to.equal(value)
          resolve()
        });
    })
    setTimeout(async () => {
      await r.table('test').insert({ value })
      await r.table('test').filter({ value }).limit(1).update({ value: value2 });
    }, 30)
    await test
    s.dispose()
  })

  it('should return valid observable and have it return update to subscribed', async () => {
    const value = `foo${Math.random() * 1000}`
    let s
    // Promise to keep track when test is done
    const test = new Promise((resolve, reject) => {
      s = feed(r.table('test'))
        .filter(change => change.type === 'delete')
        .subscribe(change => {
          expect(change.type).to.equal('delete')
          expect(change.next).to.equal(null)
          expect(change.prev.value).to.equal(value)
          resolve()
        });
    })
    // Promise to keep track db actions have ended
    const db = new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await r.table('test').insert({ value })
          await r.table('test').filter({ value }).limit(1).delete();
          resolve()
        } catch (e) {
          reject(e)
        }
      }, 30)
    })
    await test
    await db
    s.dispose()
  })

  after(async () => {
    await r.tableDrop('test');
    await r.getPoolMaster().drain();
  });
});
