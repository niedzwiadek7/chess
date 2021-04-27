import Position from '@/assets/interface/Position';

export enum Color {
  white = 'white',
  black = 'black',
}

interface Player {
  color: Color,
  possibleMoves: Position[],
}

export default Player;
