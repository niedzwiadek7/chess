import Position from '@/assets/interface/Position';
import Figure from '@/assets/interface/Figure';
import King from '@/assets/Figure/King';

export enum Color {
  white = 'white',
  black = 'black',
}

interface Player {
  color: Color,
  figures: Figure[],
  possibleMoves: Position[],
  isChecked: boolean;
  king: Figure,
}

export default Player;
