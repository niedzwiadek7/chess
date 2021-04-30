// eslint-disable-next-line import/no-cycle
import Position from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';

export enum Types {
  king = 'king',
  queen = 'queen',
  rook = 'rook',
  bishop = 'bishop',
  knight = 'knight',
  pawn = 'pawn',
}

export interface MoveFigure {
  oldPosition: Position,
  newPosition: Position,
}

interface Figure {
  type: Types,
  colour: Colour,
  path: string,
  possibleMoving: Position[],
  possibleBlocked: Position[],
  possibleMoves(board: Position[][], actualPosition: Position,
    checkingSecurity: boolean, king: Position): void,
  move(oldPosition: Position, newPosition: Position): MoveFigure,
}

export default Figure;
