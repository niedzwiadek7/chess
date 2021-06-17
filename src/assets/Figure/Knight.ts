import Position from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';
import possibleMoves from '@/assets/Figure/Scripts/SingleMove';
import Types from '@/assets/enums/Types';
import RecordMove from '@/assets/class/RecordMove';
import Figure from '../interface/Figure';

export default class Knight implements Figure {
  type: Types;

  colour: Colour;

  path: string;

  possibleMoving: Position[];

  wrongColour: Colour;

  name: string;

  constructor(colour: Colour) {
    this.type = Types.knight;
    this.colour = colour;
    this.path = this.generatorPath();
    this.possibleMoving = [];
    if (this.colour === Colour.white) this.wrongColour = Colour.black;
    else this.wrongColour = Colour.white;
    this.name = `${this.type}_${this.colour}`;
  }

  generatorPath(): string {
    return `/figures/${this.colour}/${this.type}.svg`;
  }

  possibleMoves(board: Position[][], actualPosition: Position,
    checkingSecurity: boolean, king: Position): void {
    const moves: number[][] = [[1, 2], [2, 1], [-1, 2], [-2, 1],
      [1, -2], [2, -1], [-1, -2], [-2, -1]];

    this.possibleMoving = possibleMoves(board, actualPosition,
      checkingSecurity, king, this, moves);
    this.possibleMoving.forEach((el) => {
      if (el.attackedBy.findIndex((elem) => elem === actualPosition) === -1) {
        el.attackedBy.push(actualPosition);
      }
    });
  }

  move(oldPosition: Position, newPosition: Position): RecordMove {
    const attackOpponent: boolean = newPosition.figure !== undefined;
    // eslint-disable-next-line no-param-reassign
    oldPosition.figure = undefined;
    // eslint-disable-next-line no-param-reassign
    newPosition.figure = this;
    return new RecordMove(oldPosition, newPosition, this, attackOpponent, 0);
  }
}
