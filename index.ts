import * as dotenv from 'dotenv';
import { httpServer } from './src/http_server/index';
import { startWebSocketServer } from './src/wss_server/wss_server';
// import { mouse } from '@nut-tree/nut-js';

dotenv.config();

const HTTP_PORT = +(process.env.HTTP_PORT || 8181);
const WSS_PORT = +(process.env.WSS_PORT || 8080);

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

startWebSocketServer(WSS_PORT);

process.on('SIGINT', () => {
  process.exit(0);
});
