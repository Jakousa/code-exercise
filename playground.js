const { client, feed } = require('./src');

// Let's do something cool with observable changefeeds!
// Use your imagination
client().then(r => {

  feed(r.table('test'))
  .filter(change => change.type === 'insert')
  .map(change => change.next)
  .subscribe(item => {
    console.log('this item was inserted: ', item);
  });

  feed(r.table('test'))
  .filter(change => change.type === 'update')
  .map(change => [change.prev, change.next])
  .subscribe(([prev, next]) => {
    console.log('this item was updated: ', prev, 'with new value: ', next);
  });

  setInterval(async () => {
    await r.table('test').insert({value: 'foo'});
  }, 2000);

  setInterval(async () => {
    await r.table('test').filter({value: 'foo'}).limit(1).update({value: 'bar'});
  }, 2000);

})
.catch(e => {
  console.log('oops', e);
});
