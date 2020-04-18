const fs = require('fs')

function changecert (server, keypath, certpath) {
  var option = {}
  const result1 = 'key'
  const result2 = 'cert'
  watchfile(keypath, option, result1, certpath, server)
  watchfile(certpath, option, result2, keypath, server)
}

function watchfile (filepath, option, result, otherpath, server) {
  fs.watch(filepath, (eventType, filename) => {
    if (eventType === 'change') {
      if (result === 'key') {
        option = {
          key: fs.readFileSync(filepath),
          cert: fs.readFileSync(otherpath)
        }
      } else if (result === 'cert') {
        option = {
          key: fs.readFileSync(otherpath),
          cert: fs.readFileSync(filepath)
        }
      }
      try {
        server.setSecureContext(option)
      } catch {
      }
    }
  })
}
module.exports = changecert
