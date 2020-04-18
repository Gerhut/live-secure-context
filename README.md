# live-secure-context

Live reload the secure context from file, like private keys and certificates.

## Usage

```JavaScript
const https = require('https')
const fs = require('fs')
const changecert = require('live-secure-context')

const keypath = './key.pem'
const certpath = './cert.pem'
const options = {
  key: fs.readFileSync(keypath),
  cert: fs.readFileSync(certpath)
}

const server = https.createServer(options, (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

server.listen(port, hostname)

changecert(server, keypath, certpath)
```

## Development

```
$ npm install
$ npm test
```

## License

MIT
