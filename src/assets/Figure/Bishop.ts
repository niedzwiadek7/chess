import Position from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';
import possibleMoves from '@/assets/Figure/Scripts/MultiMoves';
import Types from '@/assets/enums/Types';
import Figure from '../interface/Figure';

export default class Bishop implements Figure {
  type: Types;

  colour: Colour;

  path: string;

  possibleMoving: Position[];

  constructor(colour: Colour) {
    this.type = Types.bishop;
    this.colour = colour;
    this.path = this.generatorPath();
    this.possibleMoving = [];
  }

  generatorPath(): string {
    return `/figures/${this.colour}/${this.type}.svg`;
  }

  possibleMoves(board: Position[][], actualPosition: Position,
    checkingSecurity: boolean, king: Position): void {
    const moves: number[][] = [[1, 1], [-1, 1], [1, -1], [-1, -1]];

    this.possibleMoving = possibleMoves(board, actualPosition, checkingSecurity, king, this, moves);
    this.possibleMoving.forEach((el) => {
      if (el.attackedBy.findIndex((elem) => elem === actualPosition) === -1) {
        el.attackedBy.push(actualPosition);
      }
    });
  }

  move(oldPosition: Position, newPosition: Position): void {
    // eslint-disable-next-line no-param-reassign
    oldPosition.figure = undefined;
    // eslint-disable-next-line no-param-reassign
    newPosition.figure = this;
  }
}
