import Position from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';
import possibleMoves from '@/assets/Figure/Scripts/MultiMoves';
import Types from '@/assets/enums/Types';
import Figure from '../interface/Figure';

export default class Rook implements Figure {
  type: Types;

  colour: Colour;

  path: string;

  possibleMoving: Position[];

  firstMove: boolean;

  constructor(colour: Colour) {
    this.type = Types.rook;
    this.colour = colour;
    this.path = this.generatorPath();
    this.possibleMoving = [];
    this.firstMove = true;
  }

  generatorPath(): string {
    return `/figures/${this.colour}/${this.type}.svg`;
  }

  possibleMoves(board: Position[][], actualPosition: Position,
    checkingSecurity: boolean, king: Position): void {
    const moves: number[][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    this.possibleMoving = possibleMoves(board, actualPosition, checkingSecurity, king, this, moves);
    this.possibleMoving.forEach((el) => {
      if (el.attackedBy.findIndex((elem) => elem === actualPosition) === -1) {
        el.attackedBy.push(actualPosition);
      }
    });
  }

  move(oldPosition: Position, newPosition: Position): void {
    this.firstMove = false;
    // eslint-disable-next-line no-param-reassign
    oldPosition.figure = undefined;
    // eslint-disable-next-line no-param-reassign
    newPosition.figure = this;
  }
}
