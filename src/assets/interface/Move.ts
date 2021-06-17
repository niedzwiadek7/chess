// eslint-disable-next-line import/no-cycle
import Position from '@/assets/interface/Position';
// eslint-disable-next-line import/no-cycle
import Figure from '@/assets/interface/Figure';

interface Move {
  oldPosition: Position,
  newPosition: Position,
  value: string,
  figure: Figure,
}

export default Move;
