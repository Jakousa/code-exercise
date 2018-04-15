const Rx = require('rx-node');
const { Readable } = require('stream')

const remappedTypes = {
  add: 'insert',
  change: 'update'
}
// Export a function that wraps any database query changefeed into
// RX observable
module.exports = (queryObject) => {
  const readable = new Readable({
    read(size) {}
  })
  queryObject.changes({ includeTypes: true }).run((err, muuta) => {
    muuta.each((err, message) => {
      if (!err) {
        const formattedMessage = {
          type: remappedTypes[message.type],
          prev: message.old_val,
          next: message.new_val,
        }
        readable.push(JSON.stringify(formattedMessage))
      }
    })
  })
  return Rx.fromReadableStream(readable, 'data')
};
