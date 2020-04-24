# live-secure-context

Live reload the secure context from file, like private keys and certificates.

## Usage

```JavaScript
const https = require('https')
const fs = require('fs')
const liveSecureContext = require('live-secure-context')

const server = https.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

liveSecureContext(server, {
  key: './key.pem',
  cert: './cert.pem'
})

server.listen(port, hostname)
```

## Development

```
$ npm install
$ npm test
```

## License

MIT
