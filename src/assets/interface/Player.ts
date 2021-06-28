import Colour from '@/assets/enums/Colour';
import Position from '@/assets/interface/Position';
import Time from '@/assets/interface/Time';
import Figure from '@/assets/interface/Figure';

interface Player {
  name: string,
  colour: Colour,
  figures: Position[],
  possibleMoves?: Position[],
  king: Position,
  isChecked: boolean,
  time: Time,
  broken: Figure[],
}

export default Player;
