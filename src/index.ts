import { createServer } from 'http';
import { app } from './app.js';
import createDebug from 'debug';

const debug = createDebug('W7E:index');
const PORT = process.env.PORT || 3030;

const server = createServer(app);
debug('Starting server');

server.listen(PORT);

server.on('listening', () => {
  debug('Listening on port', PORT);
});
