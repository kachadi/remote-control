import {
  mouse,
  left,
  right,
  up,
  down,
  Button,
} from '@nut-tree/nut-js';

const drawCommandHandler = async (command, [width, length]) => {
  await mouse.pressButton(Button.LEFT);

  switch (command) {
    case 'square':
      await mouse.drag(right(width));
      await mouse.drag(down(width));
      await mouse.drag(left(width));
      await mouse.drag(up(width));

      
      break; 
    case 'rectangle':
      await mouse.drag(right(length));
      await mouse.drag(down(width));
      await mouse.drag(left(length));
      await mouse.drag(up(width));

      break;

    case 'circle':
      const mousePosition = await mouse.getPosition();

      const path = [];

      for (let i = 0; i < 360; i += 1) {
        const rad = Math.PI / 180;
        const radius = width / 2;
        const x = mousePosition.x + radius * Math.cos(i * rad) - radius;
        const y = mousePosition.y + radius * Math.sin(i * rad);

        path.push({ x, y });
      }

      await mouse.drag(path);

      break;
  }

  await mouse.releaseButton(Button.LEFT);
};
export { drawCommandHandler };
