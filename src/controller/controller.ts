import { drawCommandHandler } from '../commands/drawCommands';
import { mouseCommandsHandler } from '../commands/mouseCommands';
import { prntScrCommandHandler } from '../commands/prntScrCommand';

const commandsController = async (input, command, type, args) => {
  switch (command) {
    case 'mouse':
      const position = await mouseCommandsHandler(type, args[0]);

      if (position) {
        return `${input} ${position.x},${position.y}`;
      } else {
        return input;
      }

    case 'draw':
      await drawCommandHandler(type, args);
      return input;

    case 'prnt':
      const prntScr = await prntScrCommandHandler();
      console.log(prntScr);
      
      return prntScr;
    default:
      return input;
  }
};

export { commandsController };
