// eslint-disable-next-line import/no-cycle
import Position from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';
import Types from '@/assets/enums/Types';

interface Figure {
  type: Types,
  colour: Colour,
  path: string,
  possibleMoving: Position[],
  firstMove?: boolean,
  possibleMoves(board: Position[][], actualPosition: Position,
    checkingSecurity: boolean, king: Position): void,
  move(oldPosition: Position, newPosition: Position): void,
}

export default Figure;
