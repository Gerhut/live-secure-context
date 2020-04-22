const fs = require('fs')

function liveSecureContext (server, options) {
  const { key, cert, ...secureContext } = options
  const watchers = [
    fs.watch(key, () => {
      try {
        secureContext.key = fs.readFileSync(key)
        server.setSecureContext(secureContext)
      } catch (error) {
        console.error(error)
      }
    }),
    fs.watch(cert, () => {
      try {
        secureContext.cert = fs.readFileSync(cert)
        server.setSecureContext(secureContext)
      } catch (error) {
        console.error(error)
      }
    })
  ]

  try {
    secureContext.key = fs.readFileSync(key)
    secureContext.cert = fs.readFileSync(cert)
    server.setSecureContext(secureContext)
  } catch (error) {
    console.error(error)
  }

  server.on('close', () => {
    for (const watcher of watchers) {
      watcher.close()
    }
  })

  return server
}

module.exports = liveSecureContext
