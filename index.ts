import * as dotenv from 'dotenv';
import { httpServer } from './src/http_server/index';
// import { mouse } from '@nut-tree/nut-js';

dotenv.config();

const HTTP_PORT = +(process.env.HTTP_PORT || 8181);
const WSS_PORT = +(process.env.WSS_PORT || 8080);

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

