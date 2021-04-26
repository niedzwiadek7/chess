import Position from '@/assets/interface/Position';

export enum Types {
  king = 'king',
  queen = 'queen',
  rook = 'rook',
  bishop = 'bishop',
  knight = 'knight',
  pawn = 'pawn',
}

export enum Color {
  white = 'white',
  black = 'black',
}

interface Figure {
  type: Types,
  color: Color,
  path: string,
  position: Position,
}

export default Figure;
