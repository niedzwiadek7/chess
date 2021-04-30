import Position, * as constructPos from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';
import safeMoving from '@/assets/Figure/Scripts/safeMoving';
import Figure, * as FigureModule from '../interface/Figure';

export default class Bishop implements Figure {
  static includesInBoard(hor: number, per: number): boolean {
    return hor >= 0 && hor < 8 && per >= 0 && per < 8;
  }

  type: FigureModule.Types;

  colour: Colour;

  path: string;

  possibleMoving: Position[];

  possibleBlocked: Position[];

  constructor(colour: Colour) {
    this.type = FigureModule.Types.bishop;
    this.colour = colour;
    this.path = this.generatorPath();
    this.possibleMoving = [];
    this.possibleBlocked = [];
  }

  generatorPath(): string {
    return `/figures/${this.colour}/${this.type}.svg`;
  }

  callMove(posMoves: Position[], posBlocks: Position[], board: Position[][],
    actualPosition: Position, hor: number, per: number,
    checkingSecurity: boolean, king: Position): void {
    let perpendicularly = actualPosition.perpendicularly + per - 1;
    let horizontally = actualPosition.horizontally.charCodeAt(0) - 65 + hor;

    while (Bishop.includesInBoard(perpendicularly, horizontally)
    && board[perpendicularly][horizontally].figure === undefined) {
      if (!checkingSecurity
        || safeMoving(actualPosition, board[perpendicularly][horizontally], board, king, this)) {
        posMoves.push(board[perpendicularly][horizontally]);
      }
      perpendicularly += per;
      horizontally += hor;
    }

    if (Bishop.includesInBoard(perpendicularly, horizontally)) {
      posBlocks.push(board[perpendicularly][horizontally]);
      if (board[perpendicularly][horizontally].figure?.colour !== this.colour) {
        if (!checkingSecurity
          || safeMoving(actualPosition, board[perpendicularly][horizontally], board, king, this)) {
          posMoves.push(board[perpendicularly][horizontally]);
        }
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  possibleMoves(board: Position[][], actualPosition: Position,
    checkingSecurity: boolean, king: Position): void {
    const posMoves: Position[] = [];
    const posBlocks: Position[] = [];

    this.callMove(posMoves, posBlocks, board, actualPosition, 1, 1, checkingSecurity, king);
    this.callMove(posMoves, posBlocks, board, actualPosition, -1, 1, checkingSecurity, king);
    this.callMove(posMoves, posBlocks, board, actualPosition, -1, -1, checkingSecurity, king);
    this.callMove(posMoves, posBlocks, board, actualPosition, 1, -1, checkingSecurity, king);

    this.possibleBlocked = posBlocks;
    this.possibleMoving = posMoves;
    this.possibleMoving.forEach((el) => {
      el.attackedBy.push(actualPosition);
    });
  }

  move(oldPosition: Position, newPosition: Position): FigureModule.MoveFigure {
    // eslint-disable-next-line no-param-reassign
    oldPosition.figure = undefined;
    // eslint-disable-next-line no-param-reassign
    newPosition.figure = this;

    return {
      oldPosition,
      newPosition,
    };
  }
}
