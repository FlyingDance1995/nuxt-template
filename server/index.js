require('dotenv').config();
const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();
// when socket
const SocketIo = require('socket.io');
const http = require('http');

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// when socket
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

// create server when socket
const server = http.createServer(app);

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express - when socket
  app.use(nuxt.render);
  const io = new SocketIo(server);

  io.on('connection', function(client) {
    // emit an event to all connected sockets
    // io.emit('broadcast', 'This message is sent to all users when the connection is successful');

    console.log('Client connected...');
    client.on('join', function() {
        client.emit('messages', "User 'xxx' login Success");
    });

    client.on('eventClient', function(data) {
      console.log(data);
    });

    client.on('disconnect', function() {
      console.log('Client disconnect...');
    });
  });

  // Listen the server when socket
  server.listen(port, host);

  // Listen the server
  // app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
