import Colour from '@/assets/enums/Colour';
import Position from '@/assets/interface/Position';

interface Player {
  colour: Colour,
  figures?: Position[],
  possibleMoves?: Position[],
  king?: Position,
  isChecked?: boolean,
}

export default Player;
