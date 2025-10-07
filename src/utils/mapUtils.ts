export function getGrassBorderRadius(x: number, y: number, map: number[][]) {
  const RADIUS = 16;
  let topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0;

  const isWater = (yy: number, xx: number) => map[yy]?.[xx] === 2;

  if (isWater(y - 1, x) && isWater(y, x - 1) && isWater(y - 1, x - 1))
    topLeft = RADIUS;
  if (isWater(y - 1, x) && isWater(y, x + 1) && isWater(y - 1, x + 1))
    topRight = RADIUS;
  if (isWater(y + 1, x) && isWater(y, x + 1) && isWater(y + 1, x + 1))
    bottomRight = RADIUS;
  if (isWater(y + 1, x) && isWater(y, x - 1) && isWater(y + 1, x - 1))
    bottomLeft = RADIUS;

  return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
}
