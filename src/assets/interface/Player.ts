import Colour from '@/assets/enums/Colour';
import Position from '@/assets/interface/Position';
import Time from '@/assets/interface/Time';

interface Player {
  name?: string,
  colour: Colour,
  figures?: Position[],
  possibleMoves?: Position[],
  king?: Position,
  isChecked?: boolean,
  time?: Time,
}

export default Player;
