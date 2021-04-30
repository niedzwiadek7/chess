import Position, * as constructPos from '@/assets/interface/Position';
import Colour from '@/assets/enums/Colour';
import Figure, * as FigureModule from '../interface/Figure';

export default class King implements Figure {
  static includesInBoard(hor: number, per: number): boolean {
    return hor >= 0 && hor < 8 && per >= 0 && per < 8;
  }

  type: FigureModule.Types;

  colour: Colour;

  path: string;

  possibleMoving: Position[];

  possibleBlocked: Position[];

  constructor(colour: Colour) {
    this.type = FigureModule.Types.king;
    this.colour = colour;
    this.path = this.generatorPath();
    this.possibleMoving = [];
    this.possibleBlocked = [];
  }

  generatorPath(): string {
    return `/figures/${this.colour}/${this.type}.svg`;
  }

  callMove(posMoves: Position[], posBlocks: Position[], board: Position[][],
    actualPosition: Position, hor: number, per: number): void {
    const perpendicularly = actualPosition.perpendicularly + per - 1;
    const horizontally = actualPosition.horizontally.charCodeAt(0) - 65 + hor;

    if (King.includesInBoard(perpendicularly, horizontally)
    && (board[perpendicularly][horizontally].figure === undefined
    || board[perpendicularly][horizontally].figure?.colour !== this.colour)) {
      posMoves.push(board[perpendicularly][horizontally]);
    } else if (King.includesInBoard(perpendicularly, horizontally)) {
      posBlocks.push(board[perpendicularly][horizontally]);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  possibleMoves(board: Position[][], actualPosition: Position): void {
    const posMoves: Position[] = [];
    const posBlocks: Position[] = [];

    this.callMove(posMoves, posBlocks, board, actualPosition, 1, 0);
    this.callMove(posMoves, posBlocks, board, actualPosition, -1, 0);
    this.callMove(posMoves, posBlocks, board, actualPosition, 0, -1);
    this.callMove(posMoves, posBlocks, board, actualPosition, 0, 1);
    this.callMove(posMoves, posBlocks, board, actualPosition, 1, 1);
    this.callMove(posMoves, posBlocks, board, actualPosition, -1, 1);
    this.callMove(posMoves, posBlocks, board, actualPosition, -1, -1);
    this.callMove(posMoves, posBlocks, board, actualPosition, 1, -1);

    this.possibleBlocked = posBlocks;
    this.possibleMoving = posMoves;
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
