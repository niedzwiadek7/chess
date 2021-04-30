// eslint-disable-next-line import/no-cycle
import Figure from '@/assets/interface/Figure';

interface Position {
  horizontally: string,
  perpendicularly: number,
  index: string,
  handlePosition: (HTMLDivElement | null),
  figure: (Figure | undefined),
}

export function
createPosition(per: number, hor?: (string | undefined), figure?: (Figure | undefined)): Position {
  const schemaPosition: Position = {
    horizontally: 'A',
    perpendicularly: 2,
    index: 'A2',
    handlePosition: null,
    figure,
  };

  if (hor !== undefined) {
    schemaPosition.horizontally = hor;
    schemaPosition.perpendicularly = per;
  } else {
    // eslint-disable-next-line no-mixed-operators
    schemaPosition.horizontally = String.fromCharCode(65 + (per - 1) % 8);
    schemaPosition.perpendicularly = Math.floor((per - 1) / 8 + 1);
  }

  schemaPosition.index = `${schemaPosition.horizontally}${schemaPosition.perpendicularly}`;

  return schemaPosition;
}

export default Position;
