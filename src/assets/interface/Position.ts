interface Position {
  horizontally: string,
  perpendicularly: number,
  index: string,
  handlePosition(): (HTMLDivElement | null),
}

export function createPosition(per: number, hor?: (string | undefined)): Position {
  const schemaPosition: Position = {
    horizontally: 'A',
    perpendicularly: 2,
    index: 'A2',
    handlePosition(): HTMLDivElement | null {
      return document.querySelector(`#${this.index}`);
    },
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
