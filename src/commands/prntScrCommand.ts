import { mouse, Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';

const PRINT_SCR_SIZE = 200;

const getXY = async () => {
  const screenWidth = await screen.width();
  const screenHeight = await screen.height();

  const { x, y } = await mouse.getPosition();

  let screenX: number;
  let screenY: number;

  if (x < PRINT_SCR_SIZE / 2) {
    screenX = 0;
  } else if (x > screenWidth - PRINT_SCR_SIZE) {
    screenX = screenWidth - PRINT_SCR_SIZE;
  } else {
    screenX = x - PRINT_SCR_SIZE / 2;
  }

  if (y < PRINT_SCR_SIZE / 2) {
    screenY = 0;
  } else if (y > screenHeight - PRINT_SCR_SIZE) {
    screenY = screenHeight - PRINT_SCR_SIZE;
  } else {
    screenY = y - PRINT_SCR_SIZE / 2;
  }
  return { screenX, screenY };
};

const prntScrCommandHandler = async () => {
  const startPoint = await getXY();

  const x = startPoint.screenX;
  const y = startPoint.screenY;

  const screenRegion = new Region(x, y, PRINT_SCR_SIZE, PRINT_SCR_SIZE);

  screen.highlight(screenRegion);

  const image = await (await screen.grabRegion(screenRegion)).toRGB();

  const jimp = new Jimp(200, 200);

  jimp.bitmap.data = image.data;
  jimp.bitmap.width = image.width;
  jimp.bitmap.height = image.height;

  const buffer = await jimp.getBufferAsync(Jimp.MIME_PNG);
  const imageData = buffer.toString('base64');

  return `prnt_scrn ${imageData}`;
};

export { prntScrCommandHandler };
