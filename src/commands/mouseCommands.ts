import { mouse, left, right, up, down } from '@nut-tree/nut-js';

const mouseCommandsHandler = async (command: string, px: number) => {
  switch (command) {
    case 'position':    
      return await mouse.getPosition()

    case 'up':
      await mouse.move(up(px));
      break;

    case 'right':
      await mouse.move(right(px));
      break;

    case 'down':
      await mouse.move(down(px));
      break;

    case 'left':
      await mouse.move(left(px));
      break;

    default:
      
      break;
  }
};

export { mouseCommandsHandler };
