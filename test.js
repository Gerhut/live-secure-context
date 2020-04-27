/* eslint-env mocha */

const fs = require('fs')
const https = require('https')

const liveSecureContext = require('.')

describe('liveSecureContext', function () {
  let server = null

  afterEach('close the server', function (done) {
    if (server !== null && server.listening) {
      server.close(done)
    } else {
      done()
    }
  })

  afterEach('delete server.key', function () {
    try {
      fs.unlinkSync('fixtures/server.key')
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error
      }
    }
  })

  afterEach('delete server.cert', function () {
    try {
      fs.unlinkSync('fixtures/server.cert')
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error
      }
    }
  })

  it('should end-to-end works', function (done) {
    fs.writeFileSync('fixtures/server.key', fs.readFileSync('fixtures/1.key'))
    fs.writeFileSync('fixtures/server.cert', fs.readFileSync('fixtures/1.cert'))

    server = https.createServer((req, res) => res.end())
    liveSecureContext(server, {
      key: 'fixtures/server.key',
      cert: 'fixtures/server.cert'
    }).listen(() => {
      const address = server.address()
      https.get({
        hostname: address.address,
        port: address.port,
        ca: fs.readFileSync('fixtures/1.cert'),
        checkServerIdentity: () => {}
      }, () => {
        done()
      }).on('error', done)
    }).on('error', done)
  })

  it('should works when key/cert pair is updated', function (done) {
    fs.writeFileSync('fixtures/server.key', fs.readFileSync('fixtures/1.key'))
    fs.writeFileSync('fixtures/server.cert', fs.readFileSync('fixtures/1.cert'))

    server = https.createServer((req, res) => res.end())
    liveSecureContext(server, {
      key: 'fixtures/server.key',
      cert: 'fixtures/server.cert'
    }).listen(() => {
      fs.writeFileSync('fixtures/server.key', fs.readFileSync('fixtures/2.key'))
      fs.writeFileSync('fixtures/server.cert', fs.readFileSync('fixtures/2.cert'))

      const address = server.address()
      https.get({
        hostname: address.address,
        port: address.port,
        ca: fs.readFileSync('fixtures/2.cert'),
        checkServerIdentity: () => {}
      }, () => {
        done()
      }).on('error', done)
    }).on('error', done)
  })

  it('should works when key/cert pair is updated incorrectly', function (done) {
    fs.writeFileSync('fixtures/server.key', fs.readFileSync('fixtures/1.key'))
    fs.writeFileSync('fixtures/server.cert', fs.readFileSync('fixtures/1.cert'))

    server = https.createServer((req, res) => res.end())
    liveSecureContext(server, {
      key: 'fixtures/server.key',
      cert: 'fixtures/server.cert'
    }).listen(() => {
      fs.writeFileSync('fixtures/server.key', fs.readFileSync('fixtures/2.key'))

      const address = server.address()
      https.get({
        hostname: address.address,
        port: address.port,
        ca: fs.readFileSync('fixtures/1.cert'),
        checkServerIdentity: () => {}
      }, () => {
        done()
      }).on('error', done)
    }).on('error', done)
  })
})
