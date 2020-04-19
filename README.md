# live-secure-context

Live reload the secure context from file, like private keys and certificates.

## Usage

```JavaScript
const https = require('https')
const path = require('path')
const liveSecureContext = require('live-secure-context')

const server = https.createServer((req, res) => {
  res.writeHead(200)
  res.end('hello  world\n')
})

liveSecureContext(server, {
  key: 'key.pem',
  cert: 'cert.pem'
})

server.listen(8443)
```

## Development

```
$ npm install
$ npm test
```

## License

MIT
