const Rx = require('rx-node');
const { Readable } = require('stream')

const remappedTypes = {
  add: 'insert',
  change: 'update',
  remove: 'delete'
}
// Export a function that wraps any database query changefeed into
// RX observable
module.exports = (queryObject) => {
  const readable = new Readable({
    objectMode: true,
    read: (size) => { }
  })
  queryObject.changes({ includeTypes: true }).run((err, muuta) => {
    if (!muuta) {
      console.log('Error', err)
      return
    }
    muuta.each((err, message) => {
      if (!err) {
        const formattedMessage = {
          type: remappedTypes[message.type],
          prev: message.old_val,
          next: message.new_val,
        }
        readable.push(formattedMessage)
      }
    })
  })
  return Rx.fromReadableStream(readable, 'data')
};
