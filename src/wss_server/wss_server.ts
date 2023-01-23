import { createWebSocketStream, WebSocketServer } from 'ws';
import { commandsController } from '../controller/controller';

const startWebSocketServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  console.log(`Websocket server is running on the ${port} port!`);

  wss.on('connection', async (ws) => {
    console.log('Connection accepted!');

    const webSocketStream = createWebSocketStream(ws, {
      encoding: 'utf8',
      decodeStrings: false,
    });

    webSocketStream.on('data', async (chunk) => {
      console.log(`recieved: ${chunk}`);

      const [input, ...args] = chunk.toString().split(' ');
      const argsToNumber = args.map((el: string) => +el);
      const [command, type] = input.split('_');
      const result = await commandsController(
        input,
        command,
        type,
        argsToNumber
      );

      webSocketStream.write(result);

      console.log(`sended: ${result}`);
    });

    ws.on('error', (err) => {
      console.error(err.message);
    });

    ws.on('close', () => {
      console.log('Websocket closed!');
      wss.clients.forEach((el) => el.close());
      wss.close();
    });
  });
};

export { startWebSocketServer };
